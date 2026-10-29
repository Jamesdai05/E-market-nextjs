import { fetchTopProducts } from "@/utils/products";
import ProductList from "../ProductList/ProductList";
// import SectionTitle from "@/components/sectionTitle/SectionTitle";
import {fetchAllProducts} from "@/utils/actions/productActions"



const FeaturedProducts = async () => {

  console.log("FeaturedProducts rendering");

  const products = await fetchTopProducts();
  // const products = await fetchAllProducts();

  console.log("Count of FeaturedProducts",products.length);


  return (
      <div className="flex flex-col mx-auto">
        {/* <SectionTitle text="Featured Product" /> */}
        <ProductList products={products} />
      </div>
  );
}

export default FeaturedProducts