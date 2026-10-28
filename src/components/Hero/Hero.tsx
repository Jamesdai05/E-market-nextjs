import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {cn} from "@/lib/utils"

const Hero = () => {
    return (
        <section className="bg-nav/18 rounded-xl">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-6 md:grid-cols-2 md:py-12">
                <div className="flex flex-col gap-6 items-start">
                    <h1 id="hero-heading" className="hero-heading">
                        Electronics & electrical essentials, powered for
                        everyday life
                    </h1>
                    <div className="flex flex-col gap-6">
                        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                            Shop the latest gadgets, smart home devices,
                            lighting and power accessories from trusted brands —
                            at prices that make sense.
                        </p>
                        <p className="max-w-md text-md leading-6 text-muted-foreground text-pretty md:text-base">
                            Level up your style,gaming setup, and everyday tech.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className={cn(
                            buttonVariants({ variant: "default", size: "lg" }),
                            "w-fit bg-white text-slate-950 hover:bg-slate-200",
                        )}
                    >
                        Shop now <ArrowUpRight className="size-4" />
                    </Link>
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-xl shadow-nav-accent/10">
                    <Image
                        src="/images/hero.jpg"
                        alt="electronics,fashions and electronics collection"
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
};
export default Hero;
