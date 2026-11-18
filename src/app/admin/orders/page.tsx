import { Suspense } from "react";
import Loader from "@/components/global/Loader";
// import { getAllOrderByAdmin } from "@/utils/actions/order/orderAction";
import AdminOrderslist from "@/components/order/AdminOrdersList";



const AdminOrdersPage = async() => {

  // const orders = await getAllOrderByAdmin();

  // const formatDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center py-6">
      <Suspense fallback={<Loader />}>
        <AdminOrderslist />
      </Suspense>
    </div>
  );
}
export default AdminOrdersPage