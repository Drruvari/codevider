// components/aboutSection/aboutWrapper.tsx
import { links } from "@/data/data";
import { isDesktop } from "@/lib/utils";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import "swiper/css";
import Magentic from "../ui/magentic";

export function AboutWrapper() {
    // 1. Track whether we've hydrated (mounted) in the browser
    const [hasMounted, setHasMounted] = useState(false);

    // 2. Define desktop vs. mobile copy
    const desktopCopy = {
        main: "Featured Work",
        para:
            "To deliver high-quality, on-time digital solutions focused on managing customer and employee data — crafted with care and innovation.",
    };
    const mobileCopy = {
        main: "Recent Work",
        para:
            "We are a professional web development outsourcing company based in Albania, ensuring quality software development while reducing costs and time-to-market.",
    };

    // 3. Always start with desktop on initial render (server or client)
    const [text, setText] = useState(desktopCopy);

    useEffect(() => {
        // 4. Once in the browser, mark hasMounted
        setHasMounted(true);

        // 5. Immediately switch to mobile if needed
        if (!isDesktop()) {
            setText(mobileCopy);
        }

        // 6. Listen for window resize and update copy
        const handleResize = () => {
            if (isDesktop()) {
                setText(desktopCopy);
            } else {
                setText(mobileCopy);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 7. During SSR (and until hasMounted is true), `text` remains desktopCopy.
    //    Only after hydration do we possibly switch to mobileCopy.
    const { main, para } = text;

    return (
        <main className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
            <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em]">
                <p
                    id="my-text"
                    className="text-left leading-[1.3] text-colorSecondaryDark md:w-[100%]"
                >
                    {para}
                </p>
                <Magentic
                    href={links.work}
                    scrambleParams={{ text: "View all Work" }}
                    onMouseEnter={() => {
                        if (hasMounted && isDesktop()) {
                            gsap.to("body", {
                                "--colorLight": "#0e0d0c",
                                "--colorDark": "#fff",
                                "--colorSecondaryDark": "#bfbfbf",
                                "--colorSecondaryLight": "#404040",
                                "--colorSecondaryHalfLight": "#1a1a1a",
                                "--colorSecondaryHalfDark": "#f2f2f2",
                                "--colorWhite": "#000",
                            });
                        }
                    }}
                    onMouseLeave={() => {
                        if (hasMounted && isDesktop()) {
                            gsap.to("body", {
                                "--colorLight": "#fff",
                                "--colorDark": "#0e0d0c",
                                "--colorSecondaryDark": "#404040",
                                "--colorSecondaryLight": "#bfbfbf",
                                "--colorSecondaryHalfLight": "#f2f2f2",
                                "--colorSecondaryHalfDark": "#1a1a1a",
                                "--colorWhite": "#fff",
                            });
                        }
                    }}
                    className="mask group h-full items-center justify-center rounded-2xl bg-colorDark p-3 md:relative md:min-h-full md:w-[33%] md:rounded-full"
                >
                    <p className="shapka !flex text-[0.9em] text-colorLight md:text-[0.7em]">
                        <span className="scrambleText whitespace-nowrap">
                            View all Work
                        </span>
                        <svg
                            className="ml-4 w-[0.7em] -rotate-45 text-colorLight"
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>arrow-up-right</title>
                            <g stroke="none" strokeWidth="2.5" fill="none" fillRule="evenodd">
                                <g
                                    transform="translate(-1019 -279)"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <g
                                        transform="translate(1026 286) rotate(90) translate(-1026 -286) translate(1020 280)"
                                    >
                                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                                        <line x1="12" y1="0" x2="0" y2="12"></line>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </p>
                </Magentic>
            </div>

            <div className="customBorder anime mx-auto my-[1.5em] h-[2px] w-[calc(100%_-_20px)] self-start rounded-full bg-colorSecondaryLight opacity-30" />

            <div className="anime relative flex h-[260px] w-full items-center justify-center md:h-[380px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="anime">
                        <h2 className="work_heading mask">{main}</h2>
                    </div>
                </div>
                <div className="section3__video overflow-hidden rounded-3xl bg-black md:rounded-[3rem]">
                    <video
                        id="video"
                        playsInline
                        autoPlay
                        muted
                        loop
                        src="/video/work.mp4"
                    ></video>
                </div>
            </div>
        </main>
    );
}
