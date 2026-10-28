import { fetchAllProducts } from "@/utils/actions/productActions";
import Messsage from "../global/Message";
import ProductList from "../ProductList/ProductList";


const ProductContent =async() => {

  const allProducts = await fetchAllProducts();

  console.log(allProducts);

  if(allProducts.length===0)return <Messsage>No products available found.</Messsage>

  return (

    <ProductList products={allProducts} />
  )
};

export default ProductContent;