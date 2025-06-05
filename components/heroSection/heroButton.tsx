import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Magentic from "../ui/magentic";

export function HeroButton({ }) {
    const rotateImageRef = useRef<gsap.core.Timeline | null>(null);
    const rotating = useRef(null);

    useEffect(() => {
        const ease = CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 ");
        rotateImageRef.current = gsap
            .timeline({ defaults: { ease: "none" }, repeat: -1, paused: true })
            .fromTo(
                rotating.current,
                {
                    rotation: 0,
                },
                {
                    rotation: -360,
                    duration: 3,
                    // ease,
                },
            );
    }, []);

    return (
        <Magentic
            strength={50}
            className="email_section1 anime isolate z-20  rounded-full !text-[clamp(16px,_1vw_+_14px,_24px)] md:bg-[#272727]"
            onMouseEnter={() => rotateImageRef.current?.play()}
            onMouseLeave={() => rotateImageRef.current?.pause()}
            href="/contact"
            scrambleParams={[
                {
                    text: "Don't Hessitate",
                    chars: "-x",
                },
                {
                    text: "Contact Us",
                    chars: "-x",
                },
            ]}
        >
            <div className="shapka !flex items-center justify-center gap-[3.5rem]">
                <div className="round hidden items-center justify-center md:flex">
                    <p className="absolute left-[37%] whitespace-nowrap text-[21px]">
                        <span>
                            <span className="scrambleText">Don't Hessitate</span>
                            <br />
                            <span className="scrambleText">Contact Us</span>
                        </span>
                    </p>
                </div>
                <div className="round flex items-center  justify-end md:justify-center ">
                    <Image
                        className="rotateAnimation inline-block aspect-square border-2 border-white md:border-0 md:p-1"
                        ref={rotating}
                        width={100}
                        height={100}
                        src="/svg_logo/codevider.svg"
                        alt=""
                    />
                </div>
            </div>
        </Magentic>
    );
}
