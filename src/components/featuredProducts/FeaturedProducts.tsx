import { fetchTopProducts } from "@/utils/products";
import ProductList from "../ProductList/ProductList";



const FeaturedProducts = async () => {

  const featuredProducts = await fetchTopProducts();

  // console.log(featuredProducts);
  return (
    <div className="grid featured-products">
      <ProductList products={featuredProducts} />
    </div>
  )
}
export default FeaturedProducts