import Image from "next/image";
import { useEffect, useState } from "react";

type BgImageProps = { total: number; item: any; i: number };

export function BgImage({ total, item, i }: BgImageProps) {
    const [zIndex, setZIndex] = useState(520);

    useEffect(() => {
        // 2) once we’re on the client, generate the real random
        const real =
            Math.floor(total / 2) === i
                ? 520
                : Math.floor(Math.random() * 10);
        setZIndex(real);
    }, [total, i]);

    return (
        <div
            style={{
                filter: "brightness(85%)",
                zIndex,
            }}
            className="bgImages drop-shadow-smd absolute h-[150px] w-[150px] origin-[center_center] translate-x-[-50%] translate-y-[0%] overflow-hidden rounded-3xl md:h-[250px] md:w-[250px]"
        >
            <Image
                src={item.imgLink}
                fill={true}
                alt=""
                className="h-full !w-auto min-w-full max-w-none object-cover"
            />
        </div>
    );
}
