"use client";

import { Button } from "../ui/button";
import { useTransition } from "react";
import { CreditCard } from "lucide-react";
import { startStripeCheckOut } from "@/utils/actions/stripe/actions";
import { toast } from "sonner";

type CheckOutProps = {
    orderId: string;
};

export function StripeCheckoutButton({ orderId }: CheckOutProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
          const res = await startStripeCheckOut(orderId);
          if (!res.success) {
            toast.error(res.message);
            return
          }
          // if success, then go to hosted payment page.
          window.location.assign(res.url)
        });
    };

    return (
        <Button className="w-full" disabled={isPending} onClick={handleClick}>
            <CreditCard className="size-4" />
            {isPending ? "Redirecting to stripe..." : "Pay with card"}
        </Button>
    );
}
