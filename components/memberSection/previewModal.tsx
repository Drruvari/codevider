"use client";

import { myEase1, myEase2 } from '@/lib/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';

interface Member {
    name: string;
    role: string;
    experience: string;
    year: string;
    preview: StaticImageData;
    color: string;
}

interface PreviewModalProps {
    members: Member[];
    activePreview: number;
    modalActive: boolean;
}

const PreviewModal = ({ members, activePreview, modalActive }: PreviewModalProps) => {
    const previewsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // move modal
    useGSAP(() => {
        const con = containerRef.current;

        if (!con) return;
        const moveConX = gsap.quickTo(con, "left", { duration: .4, ease: "power3.out" });
        const moveConY = gsap.quickTo(con, "top", { duration: .4, ease: "power3.out" });

        window.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            moveConX(clientX);
            moveConY(clientY);
        })
    }, { dependencies: [] })

    // hide and display modal
    useGSAP(() => {
        const con = containerRef.current;

        if (!con) return;
        if (modalActive) {
            gsap.to(con, { scale: 1, opacity: 1, duration: 0.6, ease: myEase2 })
        } else {
            gsap.to(con, { scale: 0, duration: 0.6, ease: myEase2 })
        }
    }, { scope: containerRef, dependencies: [modalActive] })

    // move the previews to the active preview
    useGSAP(() => {
        const previews = previewsRef.current;
        const con = containerRef.current;

        if (!(previews && con)) return;
        gsap.killTweensOf(previews);

        // move the previews to show a new preview on each move
        const tranlateFactor = 100 / members.length;

        gsap.to(previews, {
            yPercent: (-tranlateFactor * activePreview),
            duration: 0.6,
            ease: myEase1
        })

    }, { scope: containerRef, dependencies: [activePreview] })

    return (
        <div ref={containerRef} className='hidden lg:block w-[250px] aspect-square pointer-events-none z-[2] translate-[-50%] fixed overflow-hidden opacity-0'>
            <div ref={previewsRef}>
                {
                    members.map((item, i) => (
                        <div key={`modal-${i}`} className={`w-[250px] relative aspect-square flex items-center justify-center`}
                            style={{ backgroundColor: item.color }}
                        >
                            {/* <span className='absolute left-[50%] top-[50%] translate-[-50%]'>Image {i + 1}</span> */}
                            <Image
                                src={item.preview}
                                className='w-[86%] border-1 border-myDusk rounded-sm'
                                alt={item.name}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PreviewModal;
