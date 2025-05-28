import { AboutSection } from "@/components/aboutSection/aboutSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import { HeroSection } from "@/components/heroSection/heroSection";
import { WorkSection } from "@/components/workSection/workSection";

export function Main() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <WorkSection />
            <ContactSection />
        </>
    );
}
