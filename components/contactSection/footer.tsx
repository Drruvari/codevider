import { FooterGroup } from "@/components/contactSection/footerGroup";
import { links } from "@/data/data";
import { cn, getJoinedDate } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Footer({ className }: { className?: string }) {
    const [currentTime, setCurrentTime] = useState("");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const options: Intl.DateTimeFormatOptions[] = [
            { month: "short", day: "numeric" },
            { hour: "numeric", minute: "numeric" },
        ];

        setCurrentTime(getJoinedDate(options));

        const interval = setInterval(() => {
            setCurrentTime(getJoinedDate(options));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentYear(new Date().getFullYear());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <footer
            className={cn(
                "footer__links absolute flex w-full flex-wrap gap-0 px-paddingX mix-blend-difference md:gap-12",
                className,
            )}
        >
            <FooterGroup
                className="hidden md:block"
                title="COPYRIGHT"
                links={[{ href: "", text: "Copyright © " + currentYear + "." }]}
            />
            <FooterGroup
                title="LOCAL TIME"
                className="hidden md:block"
                links={[{ href: "", text: currentTime }]}
            />

            <FooterGroup
                title="SOCIALS"
                className="md:ml-auto"
                isMagnetic={true}
                links={[
                    { href: links.email, text: "Email" },
                    { href: links.instagram, text: "Instagram" },
                    { href: links.linkedin, text: "LinkedIn" },
                ]}
            />
        </footer>
    );
}
