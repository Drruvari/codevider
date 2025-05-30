"use client";

import { Bulge } from "@/components/bulge";
import { Header } from "@/components/header";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect } from "react";

import "./styles.css";
gsap.registerPlugin(SplitText);

export default function MembersSection() {
    useEffect(() => {
        const profileImagesContainer = document.querySelector(".members-profile-images");
        const profileImages = document.querySelectorAll<HTMLImageElement>(
            ".members-profile-images .members-memberImg"
        );
        const nameElements = document.querySelectorAll<HTMLElement>(
            ".members-profile-names .members-name"
        );
        const nameHeadings = document.querySelectorAll<HTMLHeadingElement>(
            ".members-profile-names .members-name h1"
        );

        // Split each heading into chars
        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: "chars" });
            split.chars.forEach((char) => char.classList.add("letter"));
        });

        const defaultLetters = nameElements[0].querySelectorAll<HTMLElement>(".letter");
        gsap.set(defaultLetters, { y: "100%" });

        // Hover animations only for desktop
        if (window.innerWidth >= 900) {
            profileImages.forEach((img, idx) => {
                const container = img.parentElement!;
                const correspondingName = nameElements[idx + 1]; // skip default
                const letters = correspondingName.querySelectorAll<HTMLElement>(".letter");

                img.addEventListener("mouseenter", () => {
                    gsap.to(container, {
                        width: 140,
                        height: 140,
                        duration: 0.5,
                        ease: "power4.out",
                    });
                    gsap.to(letters, {
                        y: "-100%",
                        duration: 0.75,
                        stagger: { each: 0.025, from: "center" },
                    });
                });

                img.addEventListener("mouseleave", () => {
                    gsap.to(container, {
                        width: 70,
                        height: 70,
                        duration: 0.5,
                        ease: "power4.out",
                    });
                    gsap.to(letters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: { each: 0.025, from: "center" },
                    });
                });
            });

            profileImagesContainer?.addEventListener("mouseenter", () => {
                gsap.to(defaultLetters, {
                    y: "0%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: { each: 0.025, from: "center" },
                });
            });

            profileImagesContainer?.addEventListener("mouseleave", () => {
                gsap.to(defaultLetters, {
                    y: "100%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: { each: 0.025, from: "center" },
                });
            });
        }

        // Clean up listeners on unmount
        return () => {
            profileImages.forEach((img) => {
                img.replaceWith(img.cloneNode(true));
            });
            profileImagesContainer?.replaceWith(
                profileImagesContainer.cloneNode(true)
            );
        };
    }, []);

    return (
        <section className="members-section section section__3 third darkGradient text-colorLight">
            <Bulge type="Light" />
            <Header color="Light" />

            <div className="members-profile-images">
                <div className="members-img">
                    <img
                        className="members-memberImg"
                        src="/img/members/pt.jpg"
                        alt="Pasho Toska"
                    />
                </div>
                <div className="members-img">
                    <img
                        className="members-memberImg"
                        src="/img/members/ez.jpg"
                        alt="Ervin Ziko"
                    />
                </div>
                <div className="members-img">
                    <img
                        className="members-memberImg"
                        src="/img/members/al.jpg"
                        alt="Altin Luli"
                    />
                </div>
                <div className="members-img">
                    <img
                        className="members-memberImg"
                        src="/img/members/ed.jpg"
                        alt="Erion Domi"
                    />
                </div>
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
