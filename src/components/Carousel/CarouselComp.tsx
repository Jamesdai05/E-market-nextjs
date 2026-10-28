import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { uuidv4 } from "zod";

import hero1 from "@images/hero1.png";
import hero2 from "@images/hero2.png";
import hero3 from "@images/hero3.png";
import Image from "next/image";

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
    // const

    return (
        <Carousel
            opts={{ loop: true, align: "start" }}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
        >
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={image.id}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-3/4 items-center justify-center p-6">
                                    <Image
                                        src={image.src}
                                        width={1086}
                                        height={1448}
                                        priority={index === 0}
                                        alt={image.alt}
                                        placeholder="blur"
                                        className="object-cover"
                                        sizes="(max-width: 640px) 320px, (max-width: 768px) 448px, 512px"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default CarouselComp;
