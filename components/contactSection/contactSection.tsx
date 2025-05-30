import { Footer } from "@/components/contactSection/footer";
import Magentic from "@/components/ui/magentic";
import { links } from "@/data/data";
import { useAppSelector } from "@/hooks/reduxHooks";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Bulge } from "../bulge";
import { Header } from "../header";

const BgImagesContainer = dynamic(
    () => import("@/components/contactSection/bgImagesContainer"),
    { ssr: false }
);

export function ContactSection({ }) {
    const { suscribe } = useAppSelector((state) => state.fullpageReducer.third);
    const bgImagesSharedRef = useRef<gsap.core.Tween | null>(null);

    return (
        <section className="section section__5 fourth darkGradient">
            <Bulge type="Light" />
            <Header color="Light"></Header>

            <Magentic // href="mailto:email.coex@gmail.com"
                href={links.email}
                className="footer__heading anime cursor-pointer"
                scrambleParams={{
                    text: "Contact",
                }}
                onMouseEnter={() => {
                    bgImagesSharedRef.current?.restart(true);
                }}
                onMouseLeave={() => {
                    bgImagesSharedRef.current?.reverse();
                }}
            >
                <span className="shapka mask">
                    <span className="scrambleText inline-block text-left">Contact</span>
                    <span className="yellow__it">.</span>
                </span>
            </Magentic>
            <BgImagesContainer bgImagesSharedRef={bgImagesSharedRef} />
            <Footer />
        </section>
    );
}
