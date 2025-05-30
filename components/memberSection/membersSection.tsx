"use client";

import al from "@/public/img/members/al.jpg";
import ed from "@/public/img/members/ed.jpg";
import ez from "@/public/img/members/ez.jpg";
import pt from "@/public/img/members/pt.jpg";
import { useRef, useState } from "react";
import { Bulge } from "../bulge";
import { Header } from "../header";
import MembersList from "./membersList";
import PreviewModal from "./previewModal";

const teamMembers = [
    {
        name: "Pasho Toska",
        role: "Managing Partner",
        year: "Joined 2019",
        experience: "15+ years",
        preview: pt,
        color: "#5DEA7C",
    },
    {
        name: "Ervin Ziko",
        role: "Finance Manager",
        year: "Joined 2020",
        experience: "10+ years",
        preview: ez,
        color: "#E3E3E3",
    },
    {
        name: "Erion Domi",
        role: "Multinational Manager",
        year: "Joined 2021",
        experience: "12+ years",
        preview: ed,
        color: "#F2F2F2",
    },
    {
        name: "Altin Luli",
        role: "Outsourcing Manager",
        year: "Joined 2022",
        experience: "8+ years",
        preview: al,
        color: "#121212",
    },
];

const MembersSection = () => {
    const [activePreview, setActivePreview] = useState<number>(0);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleEnter = () => {
        setModalActive(true);
    };

    const handleLeave = () => {
        setModalActive(false);
    };

    return (
        <section
            ref={containerRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="section section__3 darkGradient third text-colorLight"
        >
            <Bulge type="Light" />
            <Header color="Light" />
            <div className="relative flex justify-between items-center w-full h-[40px] px-mobile lg:px-desktop-h opacity-45 text-14-body">
                <div className="basis-[50%] lg:basis-[20%] text-left">
                    Full Name
                </div>

                <div className="basis-[50%] justify-between hidden lg:flex">
                    Role
                    Experience
                </div>

                <div className="basis-[50%] lg:basis-[20%] text-right">
                    Joined
                </div>
            </div>

            <div>
                {teamMembers.map(({ name, role, experience, year }, i) => (
                    <MembersList
                        key={i}
                        name={name}
                        role={role}
                        experience={experience}
                        year={year}
                        handleMouseEnter={() => setActivePreview(i)}
                    />
                ))}

                <PreviewModal
                    members={teamMembers}
                    activePreview={activePreview}
                    modalActive={modalActive}
                />
            </div>
        </section>
    );
};

export default MembersSection;
