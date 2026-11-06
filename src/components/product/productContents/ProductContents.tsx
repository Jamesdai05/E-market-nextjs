import { fetchAllProducts } from "@/utils/actions/productActions";
import Message from "@/components/global/Message";
import ProductList from "../ProductList/ProductList";


const ProductContent =async() => {

  const allProducts = await fetchAllProducts();

  if(allProducts.length===0)return <Message>No products available found.</Message>

  return (

    <ProductList products={allProducts} />
  )
};

export default ProductContent;