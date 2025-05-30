import { AboutSection } from "@/components/aboutSection/aboutSection";
import { ContactSection } from "@/components/contactSection/contactSection";
import { HeroSection } from "@/components/heroSection/heroSection";
import MembersSection from "./memberSection/membersSection";

export function Main() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <MembersSection />
            {/* <WorkSection /> */}
            <ContactSection />
        </>
    );
}
