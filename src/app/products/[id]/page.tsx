import { Suspense } from "react";
import ProductDetailsContent from "@/components/ProductDetailsContent"

type ProductDetailsPageProps = {
    params: Promise<{ id: string }>;
};

const ProductDetailsPage = ({ params }: ProductDetailsPageProps) => {
  return (
      <div className="flex flex-col max-w-7xl justify-center items-center mx-auto">
          <Suspense fallback={<p>Loading...</p>}>
              <ProductDetailsContent params={params} />
          </Suspense>
          <div className="review">
              <h2 className="text-left">Reviews put here</h2>
          </div>
      </div>
  );
};
export default ProductDetailsPage;
