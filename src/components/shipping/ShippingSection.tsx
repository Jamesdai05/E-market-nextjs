import ShippingContent from "@/components/shipping/ShippingContent";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { getCurrentSession } from "@/lib/session";
import Loader from "@/components/global/Loader";


const ShippingSection = async () => {
    const session = await getCurrentSession();
    const savedUser = session
        ? await prisma.shippingAddress.findUnique({
              where: { userId: session.user.id },
          })
        : undefined;

    return (
      <div>
            {/* <SectionTitle text={"shipping info"} /> */}
            <Suspense fallback={<Loader />}>
                <ShippingContent
                    defaults={savedUser ?? {
                        shippingName: "",
                        address: "",
                        city: "",
                        postalCode: "",
                        country: "",
                        phone: "",
                    }}
                />
            </Suspense>
        </div>
    );
};
export default ShippingSection;
