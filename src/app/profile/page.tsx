import { Suspense } from "react";
import Loader from "@/components/global/Loader";
import ProfileSection from "@/components/profile/ProfileSection";
import SectionTitle from "@/components/global/sectionTitle/SectionTitle";
import CartSummary from "@/components/cartSection/CartSummary";
import Orderlist from "@/components/order/Orderlist";

const ProfilePage = async () => {
    return (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto">
            <SectionTitle text={"profile & orders"} />
            <div className="flex flex-col mx-auto items-start justify-center">
                <div className="grid md:grid-cols-12 gap-8 w-full py-10">
                    <div className="md:col-span-5">
                        <Suspense fallback={<Loader />}>
                            <ProfileSection />
                        </Suspense>
                    </div>
                    <div className="orders md:col-span-7">
                        <Suspense fallback={<Loader />}>
                            <Orderlist />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;
