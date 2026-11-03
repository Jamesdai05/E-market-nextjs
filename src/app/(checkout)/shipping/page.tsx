import Loader from "@/components/global/Loader";
import ShippingSection from "@/components/shipping/ShippingSection";
import { Suspense } from "react";

const ShippingPage = () => {


  return (
      <div>
          <Suspense fallback={<Loader />}>
              <ShippingSection />
          </Suspense>
      </div>
  );
}
export default ShippingPage;