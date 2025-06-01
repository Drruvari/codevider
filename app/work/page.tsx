"use client";
import { Cursor } from "@/components/cursor";
import FullpageProviderWork from "@/components/fullpageProviderWork";
import { HeaderNavigation } from "@/components/headerNavigation";
import { WorkSection } from "@/components/workPage/workSection";
import "../header.css";
import "../work.css";

const projectsData = [
    {
        title: (
            <>
                Project <br /> One
            </>
        ),
        description: "Description 1",
        link: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Project <br /> Two
            </>
        ),
        description: "Description 2",
        link: "https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Project <br /> Three
            </>
        ),
        description: "Description 3",
        link: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageLink: "https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: (
            <>
                Project <br /> Four
            </>
        ),
        description: "Description 4",
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
                    <div className="background">
                        PROJECTS
                        <br />
                        PROJECTS
                    </div>

                    {projectsData.map((item, index) => (
                        <WorkSection
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
