import { gsap } from "gsap";
import { useEffect } from "react";

export const Cursor: React.FC = () => {
    useEffect(() => {
        function handleMove(e: MouseEvent) {
            gsap.to(".cursor", {
                x: e.clientX,
                y: e.clientY,
                stagger: 0.05,
            });
        }

        document.addEventListener("mousemove", handleMove);
        return () => {
            document.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return (
        <>
            {/* Inner dot */}
            <div
                className="
          fixed
          w-4 h-4
          bg-[var(--primary-color)]
          rounded-full
          left-0 top-0
          pointer-events-none
          transform
          -translate-x-1/2
          -translate-y-1/2
          z-[9999]
          cursor
        "
            ></div>

            {/* Outer ring */}
            <div
                className="
          fixed
          w-6 h-6
          border
          border-[var(--primary-color)]
          rounded-full
          left-0 top-0
          pointer-events-none
          transform
          -translate-x-1/2
          -translate-y-1/2
          z-[999]
          cursor
        "
            ></div>
        </>
    );
};
