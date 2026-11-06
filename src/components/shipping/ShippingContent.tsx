"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { saveShippingDetails } from "@/utils/actions/shippingAction";
import { type ShippingState } from "@/utils/actions/shippingAction";
import { toast } from "sonner";
import Alert from "../error/Alert";
import SectionTitle from "../sectionTitle/SectionTitle";


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

// const defaultValue = {
//   shippingName: "John Doe",
//   address: "Blk 123 Street Anderson #12-234",
//   city: "Singaproe",
//   postalCode: "123456",
//   country: "Singapore",
//   phone:"12345678"
// }

const ShippingContent = ({defaults}:{defaults:ShippingInfoType}) => {
    const [state, formAction, isPending] = useActionState(
        saveShippingDetails,
        intialState,
    );

    // success will direct the page from server,so here only display error.
    useEffect(() => {
        if(state.message&&!state.success) toast.error(state.message)
    }, [state]);

  return (
    <div className="flex flex-col gap-3 px-16 mx-auto max-w-2xl">
          <form action={formAction} className="flex flex-col gap-4">
              <div className="form-group">
                  <Label htmlFor="shippingName">Name</Label>
                  <Input
                      name="shippingName"
                      id="shippingName"
                      placeholder="Enter the name"
                      autoComplete="shippingName"
                      defaultValue={defaults?.shippingName}
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
                      defaultValue={defaults?.address}
                  />
              </div>
              {state.errors?.address && (
                  <Alert>{state.errors?.address[0]}</Alert>
              )}
              <div className="form-group">
                  <Label htmlFor="city">City</Label>
                  <Input
                      placeholder="Enter the city"
                      autoComplete="city"
                      name="city"
                      id="city"
                      defaultValue={defaults?.city}
                  />
              </div>
              <div className="form-group">
                  <Label htmlFor="postalCode">PostalCode</Label>
                  <Input
                      placeholder="Enter the postalcode"
                      autoComplete="postal-code"
                      name="postalCode"
                      id="postalCode"
                      defaultValue={defaults?.postalCode}
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
                      defaultValue={defaults?.country}
                  />
              </div>
              {state.errors?.country && (
                  <Alert>{state.errors?.country[0]}</Alert>
              )}
              <div className="form-group">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                      placeholder="e.g. 9123 4567,"
                      type="tel"
                      autoComplete="tel"
                      name="phone"
                      id="phone"
                      defaultValue={defaults?.phone ?? ""}
                  />
              </div>
              {state.errors?.phone && <Alert>{state.errors?.phone[0]}</Alert>}
              <div>
                  <Button className="w-full" type="submit" disabled={isPending}>
                      {isPending ? "Submitting..." : "Submit"}
                  </Button>
              </div>
          </form>
      </div>
  );
};
export default ShippingContent;
