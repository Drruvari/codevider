import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function HeroModel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<THREE.Group>(new THREE.Group());
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();

    useEffect(() => {
        const container = containerRef.current;
        const loading = document.querySelector("#loader") as HTMLElement | null;
        if (!container) return;

        // Sizes
        const sizes = {
            width: container.clientWidth,
            height: container.clientHeight,
        };

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
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

        // Save refs
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Texture and Material (baked)
        const textureLoader = new THREE.TextureLoader();
        const bakedTexture = textureLoader.load(
            "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/baked.jpg",
            () => {
                if (loading) loading.style.display = "none";
            },
            undefined,
            (err) => console.warn("Baked texture error:", err)
        );
        bakedTexture.flipY = false;
        bakedTexture.colorSpace = THREE.SRGBColorSpace;
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

        // GLTF Loader
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            "https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room13/47b05e2db4e49eec33d63729e920894a906cb693/static/model.glb",
            (gltf: GLTF) => {
                const model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5);
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
                // Optional: loading progress
            },
            (err) => console.error(err)
        );

        // Raycaster & Pointer for click/hover
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        let hoveredMesh: THREE.Mesh | null = null;

        // Auto-rotate fallback
        let autoRotateTween: gsap.core.Tween;
        const startAutoRotate = () => {
            autoRotateTween = gsap.to(modelRef.current.rotation, {
                y: "+=" + Math.PI * 2,
                duration: 20,
                repeat: -1,
                ease: "linear",
            });
        };
        const stopAutoRotate = () => {
            if (autoRotateTween) autoRotateTween.pause();
        };
        const autoRotateTimeout = setTimeout(startAutoRotate, 2000);

        const onAnyInteraction = () => {
            clearTimeout(autoRotateTimeout);
            stopAutoRotate();
            container.removeEventListener("pointerdown", onAnyInteraction);
        };
        container.addEventListener("pointerdown", onAnyInteraction);

        // ─── Pointer / Mouse Rotation & Cursor Handling ─────────────────
        let isDragging = false;
        let previousPointer = { x: 0, y: 0 };

        // Utility: cast a ray from a pointer event to check intersection with the model
        const checkModelIntersect = (clientX: number, clientY: number) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            pointer.x = ((clientX - left) / width) * 2 - 1;
            pointer.y = -((clientY - top) / height) * 2 + 1;
            raycaster.setFromCamera(pointer, cameraRef.current!);
            const intersects = raycaster.intersectObjects(modelRef.current.children, true);
            return intersects.length > 0 ? (intersects[0].object as THREE.Mesh) : null;
        };

        const handlePointerDown = (e: PointerEvent) => {
            // Only start dragging if pointer is over the model
            const hit = checkModelIntersect(e.clientX, e.clientY);
            if (!hit) return;

            isDragging = true;
            previousPointer.x = e.clientX;
            previousPointer.y = e.clientY;
            // Change cursor to “grabbing”
            container.style.cursor = "grabbing";
        };

        const handlePointerMove = (e: PointerEvent) => {
            // If dragging, rotate the model
            if (isDragging) {
                const deltaX = (e.clientX - previousPointer.x) / container.clientWidth;
                const deltaY = (e.clientY - previousPointer.y) / container.clientHeight;
                previousPointer.x = e.clientX;
                previousPointer.y = e.clientY;

                // Drag-right rotates model right (positive), drag-left rotates left
                const rotY = modelRef.current.rotation.y + deltaX * Math.PI * 0.4;
                const rotX = modelRef.current.rotation.x + deltaY * Math.PI * 0.4;

                gsap.to(modelRef.current.rotation, {
                    x: THREE.MathUtils.clamp(rotX, -Math.PI * 0.4, Math.PI * 0.4),
                    y: rotY, // no clamp for full horizontal
                    ease: "power2.out",
                    duration: 0.3,
                });
                return; // skip hover‐cursor logic while dragging
            }

            // When not dragging, update hover state & cursor
            const hit = checkModelIntersect(e.clientX, e.clientY);
            if (hit) {
                // If pointer is over the model mesh
                hoveredMesh = hit;
                container.style.cursor = "grab";
            } else {
                hoveredMesh = null;
                container.style.cursor = "auto";
            }
        };

        const handlePointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            // Restore cursor based on hover state
            container.style.cursor = hoveredMesh ? "grab" : "auto";

            // Optionally, snap back to center—or comment out to keep current orientation
            gsap.to(modelRef.current.rotation, {
                x: 0,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
            });
        };

        // ─── Pinch-to-Zoom ───────────────────────────────────────────
        let initialDistance = 0;
        const getDistance = (touches: TouchList) => {
            const [t1, t2] = [touches[0], touches[1]];
            return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        };
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches);
            }
        };
        const handleTouchMoveZoom = (e: TouchEvent) => {
            if (e.touches.length === 2 && initialDistance > 0) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches);
                const zoomDelta = (initialDistance - currentDistance) / 200;
                if (cameraRef.current) {
                    cameraRef.current.position.z = THREE.MathUtils.clamp(
                        cameraRef.current.position.z + zoomDelta,
                        2,
                        6
                    );
                }
                initialDistance = currentDistance;
            }
        };
        const handleTouchEnd = () => {
            initialDistance = 0;
        };

        // ─── Device Orientation (Parallax) ───────────────────────────
        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            if (event.gamma == null || event.beta == null) return;
            const rotY = THREE.MathUtils.degToRad(event.gamma) * 0.002;
            const rotX = THREE.MathUtils.degToRad(event.beta) * 0.001;
            gsap.to(modelRef.current.rotation, {
                x: THREE.MathUtils.clamp(rotX, -0.3, 0.3),
                y: THREE.MathUtils.clamp(rotY, -0.3, 0.3),
                ease: "power2.out",
                duration: 0.5,
            });
        };
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
        }

        // ─── Click / Tap (Raycast) ───────────────────────────────────
        const handleClick = (event: MouseEvent | TouchEvent) => {
            let clientX = 0,
                clientY = 0;
            if (event instanceof MouseEvent) {
                clientX = event.clientX;
                clientY = event.clientY;
            } else if (event instanceof TouchEvent && event.touches[0]) {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            }
            const hit = checkModelIntersect(clientX, clientY);
            if (hit && hit.name === "InteractiveButton") {
                gsap.to(hit.rotation, { x: hit.rotation.x + Math.PI / 2, duration: 0.5 });
            }
        };

        // ─── Hover “Glow” Effect ─────────────────────────────────────
        const handleHoverMove = (e: PointerEvent) => {
            // Only apply “glow” when not dragging
            if (isDragging) return;
            const hit = checkModelIntersect(e.clientX, e.clientY);
            if (hit) {
                if (hoveredMesh !== hit) {
                    if (hoveredMesh) {
                        gsap.to((hoveredMesh.material as THREE.MeshStandardMaterial), {
                            emissiveIntensity: 0,
                            duration: 0.3,
                        });
                    }
                    hoveredMesh = hit;
                    gsap.to((hit.material as THREE.MeshStandardMaterial), {
                        emissiveIntensity: 1,
                        duration: 0.3,
                    });
                }
            } else if (hoveredMesh) {
                gsap.to((hoveredMesh.material as THREE.MeshStandardMaterial), {
                    emissiveIntensity: 0,
                    duration: 0.3,
                });
                hoveredMesh = null;
            }
        };

        // ─── Event Listeners ────────────────────────────────────────
        container.addEventListener("pointerdown", handlePointerDown);
        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerup", handlePointerUp);
        container.addEventListener("pointerleave", handlePointerUp);

        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMoveZoom, { passive: false });
        container.addEventListener("touchend", handleTouchEnd);

        // For hover glow and cursor, listen on pointermove as well
        container.addEventListener("pointermove", handleHoverMove);
        container.addEventListener("pointerdown", handleClick);

        // ─── Animation Loop ─────────────────────────────────────────
        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // ─── Handle Resize ──────────────────────────────────────────
        const handleResize = () => {
            sizes.width = container.clientWidth;
            sizes.height = container.clientHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener("resize", handleResize);

        // ─── Cleanup on Unmount ────────────────────────────────────
        return () => {
            // Stop auto-rotate
            clearTimeout(autoRotateTimeout);
            stopAutoRotate();

            // Remove device orientation
            if (window.DeviceOrientationEvent) {
                window.removeEventListener("deviceorientation", handleDeviceOrientation);
            }

            // Remove event listeners
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("pointerdown", onAnyInteraction);
            container.removeEventListener("pointerdown", handlePointerDown);
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerup", handlePointerUp);
            container.removeEventListener("pointerleave", handlePointerUp);

            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMoveZoom);
            container.removeEventListener("touchend", handleTouchEnd);

            container.removeEventListener("pointermove", handleHoverMove);
            container.removeEventListener("pointerdown", handleClick);

            // Reset cursor style (optional)
            container.style.cursor = "";

            // Remove renderer’s DOM element and dispose
            if (renderer && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-10 origin-center sm:inset-2 md:inset-4 lg:inset-6 xl:inset-8"
        />
    );
}
