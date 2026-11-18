import { getOrdersByUser } from "@/utils/actions/order/orderAction"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatPrice } from "@/utils/priceCaculation";
import Emptylist from "../Emptylist/Emptylist";
import { redirect } from "next/navigation";
import NotYet from "./NotYet";



const Orderlist = async() => {
  const orders = await getOrdersByUser();

  const formatDate = (d: string | Date) => new Date(d).toISOString().slice(0, 10);



  if (orders === null) redirect("/login");
  if (orders.length === 0) return (
    <div className="flex gap-2">
      <Emptylist heading="You have no orders yet!" />
      <Link href="/products"><span className="text-lg font-bold text-blue-300 underline hover:text-blue-400">Shop Now!</span></Link>
  </div>);

  return (
      <>
          <Table className="rounded-xl border bg-card">
              <TableCaption>A list of your recent orders.</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-25">OrderId</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Delivered</TableHead>
                      <TableHead>Action</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {orders?.map((order) => (
                      <TableRow key={order.id}>
                          {/* image */}
                          <TableCell>
                              <p>{order.id.slice(-8)}</p>
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>

                          {/* line total */}
                          <TableCell className="">
                              ${formatPrice(order.totalPrice)}
                          </TableCell>
                          <TableCell className="">
                              {order.isPaid && order.paidAt ? (
                                  formatDate(order.paidAt)
                              ) : (
                                  <NotYet />
                              )}
                          </TableCell>
                          <TableCell className="">
                              {order.isDelivered && order.deliveredAt ? (
                                  formatDate(order.deliveredAt)
                              ) : (
                                  <NotYet />
                              )}
                          </TableCell>
                          <TableCell>
                              <Link href={`/orders/${order.id}`}>
                                  <Button variant="ghost" size="sm">
                                      Details
                                  </Button>
                              </Link>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </>
  );
}
export default Orderlist