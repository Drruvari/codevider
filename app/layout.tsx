import GoogleAnalytics from "@/app/GoogleAnalytics";
import StoreProvider from "@/redux/storeProvider";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrambleTextPlugin);

const satoshi = localFont({
    src: "../font/satoshi/Satoshi-Variable.woff2",
    style: "normal",
});

export const metadata: Metadata = {
    title: "Codevider • Software Development Company",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
                    rel="stylesheet"
                />
                <GoogleAnalytics />
            </head>
            <body className={satoshi.className}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
