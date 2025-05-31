"use client";

import { Bulge } from "@/components/bulge";
import { Header } from "@/components/header";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

import "./styles.css";
gsap.registerPlugin(SplitText);

export default function MembersSection() {
    const containerRef = useRef<HTMLElement>(null);
    // Keep track of which index is currently “open” on mobile:
    let activeIdx: number | null = null;

    useEffect(() => {
        const section = containerRef.current!;
        const imgs = Array.from(
            section.querySelectorAll<HTMLImageElement>(".members-memberImg")
        );
        const nameEls = Array.from(
            section.querySelectorAll<HTMLElement>(".members-name")
        );
        const headings = Array.from(
            section.querySelectorAll<HTMLHeadingElement>(".members-name h1")
        );

        // Split each heading into .letter spans once
        headings.forEach((h) => {
            const split = new SplitText(h, { type: "chars" });
            split.chars.forEach((ch) => ch.classList.add("letter"));
        });

        // Initial state: default title showing
        const defaultLetters = nameEls[0].querySelectorAll<HTMLElement>(".letter");
        gsap.set(defaultLetters, { y: "100%" });

        // Function to animate a given index “in”
        const animateIn = (idx: number) => {
            const imgWrapper = imgs[idx].parentElement! as HTMLElement;
            const letters = nameEls[idx + 1].querySelectorAll<HTMLElement>(".letter");
            // expand
            gsap.to(imgWrapper, {
                width: "8rem",
                height: "8rem",
                duration: 0.5,
                ease: "power4.out",
            });
            // slide letters up
            gsap.to(letters, {
                y: "-100%",
                duration: 0.75,
                stagger: { each: 0.03, from: "center" },
            });
        };

        // Animate a given index “out”
        const animateOut = (idx: number) => {
            const imgWrapper = imgs[idx].parentElement! as HTMLElement;
            const letters = nameEls[idx + 1].querySelectorAll<HTMLElement>(".letter");
            // collapse
            gsap.to(imgWrapper, {
                width: "4.5rem",
                height: "4.5rem",
                duration: 0.5,
                ease: "power4.out",
            });
            // slide letters down
            gsap.to(letters, {
                y: "0%",
                duration: 0.75,
                ease: "power4.out",
                stagger: { each: 0.03, from: "center" },
            });
        };

        // Also animate default “The Squad” on container hover/tap
        const profilesWrapper = section.querySelector(
            ".members-profile-images"
        ) as HTMLElement;
        profilesWrapper.addEventListener("mouseenter", () => {
            gsap.to(defaultLetters, {
                y: "0%",
                duration: 0.75,
                stagger: { each: 0.025, from: "center" },
                ease: "power4.out",
            });
        });
        profilesWrapper.addEventListener("mouseleave", () => {
            gsap.to(defaultLetters, {
                y: "100%",
                duration: 0.75,
                stagger: { each: 0.025, from: "center" },
                ease: "power4.out",
            });
        });

        // Decide event type based on viewport width
        const isDesktop = window.innerWidth >= 900;

        imgs.forEach((img, idx) => {
            if (isDesktop) {
                // desktop: hover
                img.addEventListener("mouseenter", () => animateIn(idx));
                img.addEventListener("mouseleave", () => animateOut(idx));
            } else {
                // mobile/tablet: click toggles
                img.addEventListener("click", () => {
                    if (activeIdx === idx) {
                        animateOut(idx);
                        activeIdx = null;
                    } else {
                        if (activeIdx !== null) {
                            animateOut(activeIdx);
                        }
                        animateIn(idx);
                        activeIdx = idx;
                    }
                });
            }
        });

        // clean up
        return () => {
            imgs.forEach((img) => img.replaceWith(img.cloneNode(true)));
            profilesWrapper.replaceWith(profilesWrapper.cloneNode(true));
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="members-section section section__3 third darkGradient text-colorLight"
        >
            <Bulge type="Light" />
            <Header color="Light" />

            <div className="members-profile-images">
                {[
                    { src: "/img/members/pt.jpg", alt: "Pasho Toska" },
                    { src: "/img/members/ez.jpg", alt: "Ervin Ziko" },
                    { src: "/img/members/al.jpg", alt: "Altin Luli" },
                    { src: "/img/members/ed.jpg", alt: "Erion Domi" },
                ].map((m, i) => (
                    <div className="members-img" key={i}>
                        <img className="members-memberImg" src={m.src} alt={m.alt} />
                    </div>
                ))}
            </div>

            <div className="members-profile-names">
                <div className="members-name default">
                    <h1>The Squad</h1>
                </div>
                <div className="members-name">
                    <h1>Pasho Toska</h1>
                </div>
                <div className="members-name">
                    <h1>Ervin Ziko</h1>
                </div>
                <div className="members-name">
                    <h1>Altin Luli</h1>
                </div>
                <div className="members-name">
                    <h1>Erion Domi</h1>
                </div>
            </div>
        </section>
    );
}
