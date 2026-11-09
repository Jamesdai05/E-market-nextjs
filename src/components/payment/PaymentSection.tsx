"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, type LucideIcon } from "lucide-react";
import { savePaymentMethod, type PaymentState } from "@/utils/actions/payment/payment";
import type { PaymentInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

type PaymentMethod = PaymentInput["paymentMethod"];

const initialState: PaymentState = {
    success: false,
    message: "",
};

// typed against the schema, so a value it doesn't accept is a compile error
const methods: {
    value: PaymentMethod;
    label: string;
    icon: LucideIcon;
    description: string;
}[] = [
    {
        value: "paypal",
        label: "PayPal",
        icon: Wallet,
        description: "PayPal balance or card via PayPal",
    },
    {
        value: "stripe",
        label: "Card, WeChat Pay or Alipay",
        icon: Wallet,
        description: "Secure checkout by Stripe",
    },
];

const PaymentSection = ({
    defaultMethod,
}: {
    defaultMethod?: PaymentMethod;
}) => {
    const [state, formAction, isPending] = useActionState(
        savePaymentMethod,
        initialState,
    );

  const selected = defaultMethod ?? "paypal";


    useEffect(() => {
        if (state.message && !state.success) toast.error(state.message);
    }, [state]);

    return (
        <form
            action={formAction}
            className="flex flex-col justify-between items-center gap-4 text-xl max-w-md mx-auto"
        >
            <fieldset
                className="flex flex-col gap-3"
            >
                <legend className="mb-3 text-lg font-semibold">
                    Please select a payment method:
                </legend>
                {methods.map((method) => (
                    <Label
                        htmlFor={`payment-${method.value}`}
                        key={method.label}
                        className="flex items-center gap-2 cursor-pointer rounded-lg border p-4 text-base hover:bg-accent"
                    >
                        <input
                            type="radio"
                            value={method.value}
                            name="paymentMethod"
                            // prefixed: id="paypal" would become window.paypal and break the PayPal SDK
                            id={`payment-${method.value}`}
                            className="size-4 accent-primary"
                            defaultChecked={method.value === selected}
                        />

                        {method.label}
                        <method.icon className="w-6 h-6" />
                    </Label>
                ))}
            </fieldset>

            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving" : "Continue"}
            </Button>
        </form>
    );
};
export default PaymentSection;
