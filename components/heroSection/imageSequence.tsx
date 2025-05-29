import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      const rotateY = x * 20; // max rotation of 20deg
      const rotateX = -y * 20;

      gsap.to(image, {
        rotationY: rotateY,
        rotationX: rotateX,
        transformPerspective: 600,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      <img
        ref={imageRef}
        src="/img/statue01.png"
        alt="Statue"
        width={1024}
        height={1024}
        className="scale-[0.65] md:scale-[0.8] lg:scale-[1] will-change-transform"
      />
    </div>
  );
}
