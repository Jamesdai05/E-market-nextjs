import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserCart } from "@/utils/actions/cart/carts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Row from "./Row";
import PlaceOrderButton from "@/components/placeorder/placeOrderButton";
import { calcPrice, TaxRate } from "@/utils/priceCaculation";

const OrderSummary = ({ subtotal }: { subtotal: number }) => {
    const { itemsPrice, shippingFee, taxPrice, totalPrice } =
        calcPrice(subtotal);

    return (
        <Card className="md:sticky md:top-20">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    Order Summary:
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <Row label={"ItemsPrice"} value={itemsPrice} bold={true} />
                <Row
                    label={`${shippingFee === 0 ? "Shipping(free)" : "Shipping"}`}
                    value={shippingFee}
                    bold={true}
                />
                <Row
                    label={`Tax ${TaxRate * 100}%`}
                    value={taxPrice}
                    bold={true}
                />
                <Row label={"Total"} value={totalPrice} bold={true} />
            </CardContent>
            <CardFooter>
                <PlaceOrderButton />
            </CardFooter>
        </Card>
    );
};
export default OrderSummary;
