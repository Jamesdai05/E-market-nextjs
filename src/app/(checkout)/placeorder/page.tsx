import PlaceOrderSect from "@/components/placeorder/PlaceOrderSect";
import Loader from "@/components/global/Loader";
import { Suspense } from "react";


const PlaceorderPage = () => {
  return (
      <div className="flex max-w-7xl mx-auto py-2">
          <Suspense fallback={<Loader />}>
              <PlaceOrderSect />
          </Suspense>
      </div>
  );
}
export default PlaceorderPage;