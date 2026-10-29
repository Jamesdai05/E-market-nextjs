import { Suspense } from "react";
import Hero from "../components/Hero/Hero";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import Loader from "@/components/global/Loader";
import SectionTitle from "@/components/sectionTitle/SectionTitle";




export default function Home() {
  // console.log("Home page rendering!");


  // return (
  //   <main>
  //     <Hero />
  //     <SectionTitle text="Featured products" />
  //     <Suspense fallback={<Loader />}>
  //       <FeaturedProducts />
  //     </Suspense>
  //   </main>
  // )

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
            <main className="max-w-7xl mx-auto flex flex-col min-h-screen mt-6 gap-4">
                <Hero />
                <section id="featured-products" className="scroll-mt-20 flex flex-col gap-6">
                    <SectionTitle text="Featured Products" />
                    <Suspense fallback={<Loader />}>
                        <FeaturedProducts />
                    </Suspense>
                </section>
            </main>
        </div>
    );
}
