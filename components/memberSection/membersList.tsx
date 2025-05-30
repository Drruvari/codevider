"use client";

import { myEase2 } from "@/lib/constants";
import observeElement from "@/lib/customObserver";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface MembersListProps {
    name: string;
    role: string;
    experience: string;
    year: string;
    handleMouseEnter: () => void;
}

const MembersList = ({
    name,
    role,
    experience,
    year,
    handleMouseEnter
}: MembersListProps) => {
    const containerRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLSpanElement>(null);
    const bordersRef = useRef<HTMLSpanElement[]>([]);

    const listHoverDuration = 0.25;
    const ease = "power2.out";

    useGSAP(() => {
        const con = containerRef.current;
        const overlay = overlayRef.current;
        const borders = bordersRef.current;

        if (!overlay || borders.length === 0 || !con) return;
        gsap.set(overlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
        gsap.set(borders, { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" });

        const animateElems = () => {
            gsap.to(borders, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: myEase2
            });
        };

        observeElement(con, animateElems);
    }, { scope: containerRef });

    const detectEntryPoint = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY;
        const midPoint = rect.top + rect.height / 2;
        return mouseY < midPoint ? "top" : "bottom";
    };

    const handleLocalMouseEnter = (e: React.MouseEvent) => {
        handleMouseEnter();

        const direction = detectEntryPoint(e);
        const overlay = overlayRef.current;

        if (!overlay) return;
        gsap.killTweensOf(overlay);

        if (direction === "top") {
            // hide to top
            gsap.set(overlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });

            gsap.to(overlay, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: listHoverDuration,
                ease
            })
        } else {
            // Start fully hidden at bottom (rectangle collapsed to bottom edge)
            gsap.set(overlay, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
            });

            // Animate to fully revealed rectangle
            gsap.to(overlay, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                duration: listHoverDuration,
                ease
            });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        const direction = detectEntryPoint(e);
        const overlay = overlayRef.current;

        if (!overlay) return;

        if (direction === "bottom") {
            gsap.to(overlay, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 100% 100%)",
                duration: listHoverDuration,
                ease
            })
        } else {
            gsap.to(overlay, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: listHoverDuration,
                ease
            })
        }
    };

    return (
        <button
            ref={containerRef}
            onMouseEnter={handleLocalMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h p-list-con text-16-body"
        >
            <span ref={overlayRef} className="absolute z-[-1] left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] top-0 h-full bg-amber-300" />
            <span ref={(el) => { if (el) bordersRef.current[0] = el; }} className="absolute left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] top-0 h-[1px] bg-amber-300 p-list-first-border" />
            <div className="basis-[50%] lg:basis-[20%] text-left">
                <p className="p-list-start-text">{name}</p>
            </div>
            <div className="basis-[50%] hidden lg:flex justify-between">
                <p>{role}</p>
                <p>{experience}</p>
            </div>
            <div className="basis-[50%] lg:basis-[20%] text-right">
                <p className="p-list-end-text">{year}</p>
            </div>
            <span ref={(el) => { if (el) bordersRef.current[1] = el; }} className="absolute left-[20px] lg:left-[35px] right-[20px] lg:right-[35px] bottom-0 h-[1px] bg-amber-300" />
        </button>
    );
};

export default MembersList;
