"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { placeOrder, PlaceOrder } from "@/utils/actions/placeorder";


const PlaceOrderButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => startTransition(async()=>{
    const res = await placeOrder();
    if (res && !res.success) toast.error(res.message);
  })

  return (
    <Button
      className="mt-4 w-full"
      disabled={isPending}
      onClick={handleClick}
    >{isPending ? "Placing Order...." : "Place Order"}</Button>
  )
};

export default PlaceOrderButton