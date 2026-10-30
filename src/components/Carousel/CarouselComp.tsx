"use client";

import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import hero1 from "@images/hero1.png";
import hero2 from "@images/hero2.png";
import hero3 from "@images/hero3.png";
import Image from "next/image";
import { useRef } from "react";

const images = [
    {
        id: "apple watch",
        src: hero1,
        alt: "Apple watch",
    },
    { id: "xiao mi pad", src: hero2, alt: "Xiaomi pad" },
    {
        id: "huawei smartphone",
        src: hero3,
        alt: "Huawei smartphone",
    },
];

const CarouselComp = () => {
    // useRef keeps the same plugin instance across re-renders
    const autoplay = useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );
    return (
        <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
        >
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={image.id}>
                        <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                            <Image
                                src={image.src}
                                // width={1086}
                                // height={1448}
                                preload={index === 0}
                                fill
                                alt={image.alt}
                                placeholder="blur"
                                className="object-cover"
                                sizes="(max-width: 640px) 320px, (max-width: 768px) 448px, 512px"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    );
};

export default CarouselComp;
