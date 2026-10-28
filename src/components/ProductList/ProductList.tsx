import { ProductCard } from "@/components/productCard/ProductCard"
import type { ProductDTO } from "@/utils/types"

type ProductListProps = {
  products: ProductDTO[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto">
      {products.map(product => (<ProductCard key={product.id} product={product} />))}
    </div>
  )
}
export default ProductList