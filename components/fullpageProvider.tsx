"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setActiveSlide } from "@/redux/states/fullpageSlice";
import { splineSceneVisibility } from "@/redux/states/splineSlice";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import React, { useEffect, useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(CustomEase);

const opts = {
    autoScrolling: true,
    scrollOverflow: false,
    scrollHorizontally: false,
    navigation: false,
    navigationPosition: "left",
    scrollingSpeed: 1300,
    easingcss3: "cubic-bezier(.70,0,.30,1)",
    anchors: ["first", "second", "third", "fourth", "fifth", "sixth"],
    // For GPL v3 projects - make sure your project complies with GPL v3
    licenseKey: "gplv3-license",
    credits: {
        enabled: true, // Must be true for GPL license
    },
};

const FullpageProvider = ({ children }: { children: React.ReactNode }) => {
    const about = useRef<gsap.core.Timeline | null>(null);
    const textAnim__section2__down = useRef<gsap.core.Tween | null>(null);
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const isInitialized = useRef(false);

    const dispatch = useAppDispatch();

    const onLeave = (origin: any, destination?: any, direction?: any) => {
        // Add null checks
        if (!destination) return;

        dispatch(setActiveSlide([destination.anchor, direction]));

        // Handle body classes for gradient
        if (destination.anchor === "second" || destination.anchor === "fourth") {
            document.body.classList.add("darkGradient");
        } else {
            document.body.classList.remove("darkGradient");
        }

        // Handle spline scene visibility
        if (destination.anchor === "first") {
            dispatch(splineSceneVisibility(true));
        } else {
            dispatch(splineSceneVisibility(false));
        }

        // Handle first section animations
        if (destination.anchor === "first") {
            if (direction === "up" && about.current) {
                about.current.seek(0.3);
            }
        }

        // Handle second section animations
        if (destination.anchor === "second") {
            if (direction === "down") {
                textAnim__section2__down.current?.restart(true);
            } else {
                textAnim__section2__down.current?.restart();
            }

            // Handle video playback safely
            if (videoElement.current) {
                try {
                    videoElement.current.currentTime = 1.6;
                    videoElement.current.play().catch(e => {
                        console.warn("Video play failed:", e);
                    });
                } catch (e) {
                    console.warn("Video manipulation failed:", e);
                }
            }
        }

        // Transition animations
        const flex = window.innerWidth > 540 ? 17 : 5;
        const customEase = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1");

        if (direction === "down") {
            gsap
                .timeline()
                .from(`.${destination.anchor} .rounded__div__down`, {
                    duration: 0.1,
                })
                .fromTo(
                    `.${destination.anchor} .rounded__div__down`,
                    {
                        height: `${flex}vh`,
                    },
                    {
                        height: "0vh",
                        duration: 1.2,
                        ease: customEase,
                    },
                );

            gsap
                .timeline()
                .from(`.${destination.anchor} .anime`, {
                    duration: 0.3,
                })
                .fromTo(
                    `.${destination.anchor} .anime`,
                    {
                        y: "30vh",
                    },
                    {
                        y: "0vh",
                        duration: 1.1,
                        stagger: 0.1,
                        ease: customEase,
                    },
                );
        } else {
            gsap
                .timeline()
                .from(`.${destination.anchor} .rounded__div__up`, {
                    duration: 0.1,
                })
                .fromTo(
                    `.${destination.anchor} .rounded__div__up`,
                    {
                        height: `${flex}vh`,
                    },
                    {
                        height: "0vh",
                        duration: 1.2,
                        ease: customEase,
                    },
                );

            gsap
                .timeline()
                .from(`.${destination.anchor} .anime`, {
                    duration: 0.3,
                })
                .fromTo(
                    `.${destination.anchor} .anime`,
                    {
                        y: "-30vh",
                    },
                    {
                        y: "0vh",
                        duration: 1.1,
                        stagger: -0.08,
                        ease: customEase,
                    },
                );
        }
    };

    useEffect(() => {
        // Prevent double initialization
        if (isInitialized.current) return;
        isInitialized.current = true;

        const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1");

        // Initialize main timeline animation
        about.current = gsap
            .timeline({ defaults: { ease: "none" }, repeat: -1 })
            .fromTo(
                ".left .animate__this1",
                {
                    y: "0%",
                    opacity: 1,
                },
                {
                    y: "-140%",
                    opacity: 0,
                    duration: 0.9,
                    delay: 1.7,
                    ease,
                },
            )
            .fromTo(
                ".left .animate__this2",
                {
                    y: "140%",
                    opacity: 0,
                },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.9,
                    ease,
                },
                "-=0.9",
            )
            .fromTo(
                ".left .animate__this2",
                {
                    y: "0%",
                    opacity: 1,
                },
                {
                    y: "-140%",
                    opacity: 0,
                    delay: 1.7,
                    duration: 0.9,
                    ease,
                },
            )
            .fromTo(
                ".left .animate__this1",
                {
                    y: "140%",
                    opacity: 0,
                },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.9,
                    ease,
                },
                "-=0.9",
            );

        // Initialize text animations with error handling
        try {
            const textElement = document.querySelector("#my-text");
            if (textElement) {
                const myText = new SplitType("#my-text", { types: "lines" });
                const myText2 = new SplitType("#my-text .line", {
                    types: "lines",
                    lineClass: "innnerLine",
                });

                textAnim__section2__down.current = gsap.from(
                    "#my-text .line .innnerLine",
                    {
                        duration: 1.5,
                        y: "200%",
                        opacity: 0,
                        skewX: -10,
                        paused: true,
                        delay: 0.25,
                        stagger: 0.12,
                        ease: CustomEase.create("custom", "M0,0,C0.5,0,0,1,1,1"),
                    },
                );
            }
        } catch (error) {
            console.warn("SplitType initialization failed:", error);
        }

        // Get video element safely
        const video = document.querySelector("#video") as HTMLVideoElement;
        if (video) {
            videoElement.current = video;
        }

        return () => {
            // Cleanup animations
            if (about.current) {
                about.current.kill();
                about.current = null;
            }
            if (textAnim__section2__down.current) {
                textAnim__section2__down.current.kill();
                textAnim__section2__down.current = null;
            }
            isInitialized.current = false;
        };
    }, []);

    return (
        <ReactFullpage
            {...opts}
            onLeave={onLeave}
            render={() => {
                return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
            }}
        />
    );
};

export default FullpageProvider;
