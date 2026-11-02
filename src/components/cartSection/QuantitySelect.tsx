"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateCartItemQty } from "@/utils/actions/cartActions";

type QuantitySelectProps = {
    countInStock: number;
    itemId: string;
    productName: string;
    quantity: number;
};

const QuantitySelect = ({
    countInStock,
    quantity,
    itemId,
    productName,
}: QuantitySelectProps) => {
    const [isPending, startTransition] = useTransition();

    const maxQty = Math.min(countInStock, 10); //check the maximum qty available;
    const options = Array.from({ length: maxQty }, (_, i) => i + 1);

    const handleChange = (value: string | null) => {
        if (!value) return null;
        const newQty = Number(value);
        if (newQty === quantity) return;

        startTransition(async () => {
            const res = await updateCartItemQty(itemId, newQty);
            //aler the user the error message
            if (!res.success) toast.error(res.message);
        });
    };

    return (
        <Select
            value={String(quantity)}
            onValueChange={handleChange}
            disabled={isPending}
        >
            <SelectTrigger
                className="w-25"
                aria-label={`Quantity for ${productName}`}
            >
                <SelectValue />
            </SelectTrigger>
        <SelectContent className="w-20 min-w-20">
          {options.map(i => (
            <SelectItem key={i} value={String(i)}>{i}</SelectItem>
          ))}
            </SelectContent>
        </Select>
    );
};
export default QuantitySelect;
