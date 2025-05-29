import { AboutSection } from "@/components/aboutSection/aboutSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import { HeroSection } from "@/components/heroSection/heroSection";

export function Main() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            {/* <WorkSection /> */}
            <ContactSection />
        </>
    );
}
