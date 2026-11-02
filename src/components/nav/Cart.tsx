import { ShoppingCart } from "lucide-react"
import Link from "next/link";



const Cart = () => {
  return (
    <Link href="/cart" className="block">
      <ShoppingCart/>
    </Link>
  )
}
export default Cart