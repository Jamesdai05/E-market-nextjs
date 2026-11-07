"use client";
import { Trash2 } from "lucide-react";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removeItemFromCart } from "@/utils/actions/cart/cartActions";

type RemoveButtonProps = {
    itemId: string;
    productName: string;
};

const RemoveButton = ({ itemId, productName }: RemoveButtonProps) => {
    const [isPending, setTransition] = useTransition();

    const handleRemove = () => {
        startTransition(async () => {
            const res = await removeItemFromCart(itemId);
            if (res.success) {
                toast.success(`${productName} deleted!`);
            } else {
                toast.error(res.message);
            }
        });
    };

    return (
        <Button
            aria-label={`Remove ${productName} from cart.`}
            onClick={handleRemove}
            variant="outline"
            size="icon-lg"
            disabled={isPending}
        >
            <Trash2 className="size-4 text-destructive" />
        </Button>
    );
};

export default RemoveButton;
