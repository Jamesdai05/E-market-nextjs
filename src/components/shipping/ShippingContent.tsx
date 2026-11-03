"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { saveShippingDetails } from "@/utils/actions/shippingAction";
import { type ShippingState } from "@/utils/actions/shippingAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Alert from "../error/Alert";

type ShippingInfoType = {
  shippingName?: string;
  address: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string | null;
}

const intialState: ShippingState = {
    message: "",
    success: false,
    errors: {},
};

const defaultValue = {
  shippingName: "John Doe",
  address: "Blk 123 Street Anderson #12-234",
  city: "Singaproe",
  postalCode: "123456",
  country: "Singapore",
  phone:"12345678"
}

const ShippingContent = () => {
    const [state, formAction, isPending] = useActionState(
        saveShippingDetails,
        intialState,
    );

    // success will direct the page from server,so here only display error.
    useEffect(() => {
        if(state.message&&!state.success) toast.error(state.message)
    }, [state]);

    return (
        <form
            className="flex flex-col gap-4 px-16 mx-auto max-w-2xl"
            action={formAction}
        >
            <div className="form-group">
                <Label htmlFor="shippingName">Name</Label>
                <Input
                    name="shippingName"
                    id="shippingName"
                    placeholder="Enter the name"
                    autoComplete="shippingName"
                    defaultValue={defaultValue.shippingName}
                />
            </div>
            {state.errors?.shippingName && (
                <Alert>{state.errors?.shippingName[0]}</Alert>
            )}
            <div className="form-group">
                <Label htmlFor="address">Address</Label>
                <Input
                    name="address"
                    id="address"
                    autoComplete="address"
                    placeholder="Enter the address"
                    defaultValue={defaultValue.address}
                />
            </div>
            {state.errors?.address && <Alert>{state.errors?.address[0]}</Alert>}
            <div className="form-group">
                <Label htmlFor="city">City</Label>
                <Input
                    placeholder="Enter the city"
                    autoComplete="city"
                    name="city"
                    id="city"
                    defaultValue={defaultValue.city}
                />
            </div>
            <div className="form-group">
                <Label htmlFor="postalCode">PostalCode</Label>
                <Input
                    placeholder="Enter the postalcode"
                    autoComplete="postal-code"
                    name="postalCode"
                    id="postalCode"
                    defaultValue={defaultValue.postalCode}
                />
            </div>
            {state.errors?.postalCode && (
                <Alert>{state.errors?.postalCode[0]}</Alert>
            )}
            <div className="form-group">
                <Label htmlFor="country">Country</Label>
                <Input
                    placeholder="Enter the country"
                    autoComplete="country"
                    name="country"
                    id="country"
                    defaultValue={defaultValue.country}
                />
            </div>
            {state.errors?.country && <Alert>{state.errors?.country[0]}</Alert>}
            <div className="form-group">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    placeholder="e.g. 9123 4567,"
                    type="tel"
                    autoComplete="tel"
                    name="phone"
                    id="phone"
                    defaultValue={defaultValue.phone}
                />
            </div>
            {state.errors?.phone && <Alert>{state.errors?.phone[0]}</Alert>}
            <div>
                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};
export default ShippingContent;
