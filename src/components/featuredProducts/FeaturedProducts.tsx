import { fetchTopProducts } from "@/utils/products";
import ProductList from "../ProductList/ProductList";
// import SectionTitle from "@/components/sectionTitle/SectionTitle";



const FeaturedProducts = async () => {

  const products = await fetchTopProducts();
  // const products = await fetchAllProducts();


  return (
      <div className="flex flex-col mx-auto">
        {/* <SectionTitle text="Featured Product" /> */}
        <ProductList products={products} />
      </div>
  );
}

export default FeaturedProducts