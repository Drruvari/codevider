"use client";
import { Cursor } from "@/components/cursor";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { HeaderNavigation } from "@/components/headerNavigation";
import { MembersPage } from "@/components/membersPage/membersPage";
import "../header.css";
import "../members.css";

const projectsData = [
    {
        title: (
            <>
                Pasho Toska
            </>
        ),
        description: "Managing Partner",
        link: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Ervin Ziko
            </>
        ),
        description: "Finance Manager",
        link: "https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Altin Luli
            </>
        ),
        description: "Outsourcing Manager",
        link: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Erion Domi
            </>
        ),
        description: "Multinational Manager",
        link: "https://images.unsplash.com/photo-1536735561749-fc87494598cb?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/",
        imageLink: "https://images.unsplash.com/photo-1536735561749-fc87494598cb?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export default function WorkPage() {
    return (
        <>
            <Cursor />
            <HeaderNavigation />
            <FullpageProviderWork>
                <div id="fullpage">
                    {projectsData.map((item, index) => (
                        <MembersPage
                            key={index}
                            item={item}
                            index={index}
                            length={projectsData.length}
                            color={index % 2 !== 0 ? "Light" : "Dark"}
                        />
                    ))}
                </div>
            </FullpageProviderWork>
        </>
    );
}
