import { Suspense,type ReactNode } from "react"
import { getCurrentUser } from "@/lib/session"
import CheckOutSteps from "@/components/shipping/ShippingStatus";
import Loader from "@/components/global/Loader";



const CheckLogin = async({children}:{children:ReactNode}) => {
  await getCurrentUser();
  return <>{children}</>
}

const CheckOutLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <CheckOutSteps />
      <Suspense fallback={<Loader />}>
        <CheckLogin>{children}</CheckLogin>
      </Suspense>
    </div>
  )
}
export default CheckOutLayout;