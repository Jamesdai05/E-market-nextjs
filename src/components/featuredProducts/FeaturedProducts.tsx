import { fetchTopProducts } from "@/utils/products";
import ProductList from "../ProductList/ProductList";



const FeaturedProducts = async () => {

  const featuredProducts = await fetchTopProducts();

  // console.log(featuredProducts);
  if(featuredProducts.length===0) return <p>No featured products found.</p>

  return (
    <div className="grid featured-products">
      <ProductList products={featuredProducts} />
    </div>
  )
}
export default FeaturedProducts