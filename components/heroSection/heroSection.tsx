import { Bulge } from "@/components/bulge";
import { Header } from "@/components/header";
import { HeroWrapper } from "@/components/heroSection/heroWrapper";
import { ImageSequence } from "@/components/heroSection/imageSequence";
import { useRef } from "react";

export function HeroSection({ }) {
    const sectionRef = useRef(null);
    return (
        <section
            ref={sectionRef}
            className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight"
        >
            <Bulge type="Light" />
            <Header color="Light" />
            <HeroWrapper />
            <ImageSequence />
        </section>
    );
}
