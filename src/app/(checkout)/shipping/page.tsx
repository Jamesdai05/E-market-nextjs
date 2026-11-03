import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ShippingPage = () => {
  return (
      <form className="flex flex-col gap-4 px-16 mx-auto max-w-2xl">
          <div className="form-group">
              <Label htmlFor="shippingName">Name</Label>
              <Input
                  name="shippingName"
                  id="shippingName"
                  placeholder="enter the name"
                  autoComplete="shippingName"
                  defaultValue={"Shipping owner"}
              />
          </div>
          <div className="form-group">
              <Label htmlFor="address">Address</Label>
              <Input
                  name="address"
                  id="address"
                  autoComplete="address"
                  placeholder="enter the address"
                  defaultValue={"Address"}
              />
          </div>
          <div className="form-group">
              <Label htmlFor="city">City</Label>
              <Input
                  placeholder="enter the city"
                  autoComplete="city"
                  name="city"
                  id="city"
                  defaultValue={"City"}
              />
          </div>
          <div className="form-group">
              <Label htmlFor="postalCode">PostalCode</Label>
              <Input
                  placeholder="enter the postalcode"
                  autoComplete="postal-code"
                  name="postalCode"
                  id="postalCode"
                  defaultValue={"Country"}
              />
          </div>
          <div className="form-group">
              <Label htmlFor="country">Country</Label>
              <Input
                  placeholder="enter the country"
                  autoComplete="country"
                  name="country"
                  id="country"
                  defaultValue={"Country"}
              />
          </div>
          <div className="form-group">
              <Label htmlFor="phone">Phone</Label>
              <Input
                  placeholder="e.g. 9123 4567,"
                  type="tel"
                  autoComplete="tel"
                  name="phone"
                  id="phone"
                  defaultValue={"12345678"}
              />
          </div>
          <div>
              <Button className="w-full">Submit</Button>
          </div>
      </form>
  );
}
export default ShippingPage;