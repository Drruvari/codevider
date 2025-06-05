import { Header } from "@/components/header";
import Magentic from "@/components/ui/magentic";
import { cn } from "@/lib/utils";
import React from "react";
import { Bulge } from "../bulge";

export function MembersPage({
    index,
    item,
    color,
    length,
}: {
    index: number;
    item: {
        title: React.JSX.Element;
        description: string;
        link: string;
        imageLink: string;
    };
    color: "Dark" | "Light";
    length: number;
}) {
    return (
        <div
            className={`section s${index} ${color == "Dark" ? "lightGradient" : "darkGradient"
                }
      text-color${color} `}
            key={item.link}
        >
            <Header color={color}></Header>
            <Bulge type={color} />

            <div
                className={`fullpage__slide
        `}
            >
                <a
                    className={`image image--works image--works${index + 1} anime rounded-3xl bg-center bg-cover bg-no-repeat`}
                    target="_blank"
                    href={item.link}
                    style={{ backgroundImage: `url(${item.imageLink})` }}
                >
                </a>
                <div className="title ml-paddingX">
                    <h2 className="title__text js-letter anime mask font-bold tracking-tight">
                        {item.title}
                        <br />
                    </h2>
                    <p className="title__lead js-letter anime ">{item.description}</p>
                    <div className="btn-wrap js-letter anime">
                        <Magentic
                            strength={50}
                            className={`btn text-color${color === "Dark" ? "Light" : "Dark"
                                } bg-color${color} mask`}
                            href={item.link}
                            target="_blank"
                        >
                            <p className="shapka">
                                Contact
                            </p>
                        </Magentic>
                    </div>
                </div>
            </div>

            <div className="anime absolute bottom-10 flex w-full items-end justify-center gap-6">
                {Array(length)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <div
                                key={i}
                                className={cn(
                                    `h-3 w-3 bg-colorSecondary${color} rounded-full`,
                                    ` ${i === index ? `h-5 w-5 bg-color${color}` : ""}`,
                                )}
                            ></div>
                        );
                    })}
            </div>
        </div>
    );
}
