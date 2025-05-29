"use client";
import { Cursor } from "@/components/cursor";
import FullpageProvider from "@/components/fullpageProvider";
import { HeaderNavigation } from "@/components/headerNavigation";
import { Main } from "@/components/main";

import "./index.css";

export default function HomePage({ }) {
    return (
        <>
            <Cursor />
            <HeaderNavigation />
            <FullpageProvider>
                <Main />
            </FullpageProvider>
        </>
    );
}
