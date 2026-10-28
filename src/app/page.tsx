import { Suspense } from "react";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";

export default function Home() {
    // const products = await fetchTopProducts();

    // console.log(products);

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
            <main className="max-w-7xl mx-auto flex flex-col min-h-screen mt-6">
                <Hero />
                <section id="featured-products" className="scroll-mt-20">
                    <h2 className="mb-6 text-2xl font-bold">
                        Featured Products
                    </h2>
                    <Suspense fallback={<p>Loading...</p>}>
                        <FeaturedProducts />
                    </Suspense>
                </section>
            </main>
        </div>
    );
}
