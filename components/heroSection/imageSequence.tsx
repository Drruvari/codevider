import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function ImageSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<THREE.Group>(new THREE.Group());
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();

    useEffect(() => {
        const container = containerRef.current;
        const loading = document.querySelector('#loader') as HTMLElement | null;
        if (!container) return;

        // Sizes
        const sizes = {
            width: container.clientWidth,
            height: container.clientHeight
        };

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            sizes.width / sizes.height,
            0.1,
            100
        );
        // Centered camera position
        camera.position.set(0, 1.5, 3);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        // Lights
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(5, 10, 7.5);
        scene.add(dirLight);

        // Store refs
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Texture and Material
        const textureLoader = new THREE.TextureLoader();
        const bakedTexture = textureLoader.load(
            "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/baked.jpg",
            () => {
                if (loading) loading.style.display = 'none';
            },
            undefined,
            (err) => console.warn("Baked texture error:", err)
        );
        bakedTexture.flipY = false;
        bakedTexture.colorSpace = THREE.SRGBColorSpace;
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

        // Load GLB Model
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/model.glb",
            (gltf: GLTF) => {
                const model = gltf.scene;
                // Scale down and center
                model.scale.set(0.50, 0.50, 0.50);
                model.position.set(0, 0, 0);
                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        (child as THREE.Mesh).material = bakedMaterial;
                    }
                });
                scene.add(model);
                modelRef.current = model;
            },
            (xhr) => {
                // console.log(`${(xhr.loaded / xhr.total * 100).toFixed(1)}% loaded`);
            },
            (err) => console.error(err)
        );

        // Mouse Rotation via GSAP
        const handleMouseMove = (e: MouseEvent) => {
            if (!container) return;
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            const rotY = x * 0.4;
            const rotX = -y * 0.4;
            gsap.to(modelRef.current.rotation, {
                x: rotX,
                y: rotY,
                ease: "power2.out",
                duration: 0.5
            });
        };
        const handleMouseLeave = () => {
            gsap.to(modelRef.current.rotation, {
                x: 0,
                y: 0,
                ease: "power2.out",
                duration: 0.5
            });
        };
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        // Animation Loop
        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            sizes.width = container.clientWidth;
            sizes.height = container.clientHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            if (renderer && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div id="hero-lightpass" ref={containerRef} className="absolute inset-0 z-10 origin-center" />
    );
}
