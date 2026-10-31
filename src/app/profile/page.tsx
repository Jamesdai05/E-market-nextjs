import { Suspense } from "react";
import Loader from "@/components/global/Loader";
import ProfileSection from "@/components/profile/ProfileSection";
import SectionTitle from "@/components/sectionTitle/SectionTitle";


const ProfilePage = async () => {
  return (
      <div className="flex flex-col gap-4 max-w-7xl mx-auto">
          <SectionTitle text={"profile & orders"} />
          <div className="flex flex-col w-280 mx-auto items-start">
              <div className="grid md:grid-cols-12 gap-6 w-full px-8 py-10">
                  <div className="md:col-span-5">
                      <Suspense fallback={<Loader />}>
                          <ProfileSection />
                      </Suspense>
                  </div>
                  <div className="orders md:col-span-7">
                      <h1>Here will be the orders displaying.</h1>
                  </div>
              </div>
          </div>
      </div>
  );
};
export default ProfilePage;
