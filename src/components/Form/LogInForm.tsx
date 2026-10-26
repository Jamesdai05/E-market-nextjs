import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "../passwordInput/PasswordInput";
import Link from "next/link";

const LogInForm = () => {
    return (
        <form
            action=""
            className="flex flex-col items-center justify-center gap-4"
        >
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    placeholder="Enter the email"
                    id="email"
                    autoComplete="email"
                    className="w-full min-w-[20em] bg-input p-2"
                />
            </div>
            <div className="form-group">
                <Label htmlFor="password">Password</Label>
                {/* <Input
                    name="password"
                    type="password"
                    placeholder="Enter the password"
                    id="password"
                    autoComplete="password"
                    className="p-2 bg-nav-foreground text-gray-500 w-[20em]"
                />
            </div> */}
                <PasswordInput
                    className="p-2 bg-input text-gray-500 w-[20em]"
                    placeholder="Enter the password"
                    aria-label="password"
                    required
                />
            </div>
            <Button
                type="submit"
                className="w-full mt-4 bg-sky-400 font-bold text-nav-foreground hover:bg-nav-foreground hover:text-nav"
            >
                Submit
            </Button>
            <div className="link flex justify-center">
                <p className="text-sm">
                    Dont have an account yet?{" "}
                    <span>
                        <Link
                            href="/register"
                            className="underline text-md hover:text-accent hover:font-bold"
                        >
                            Sign Up
                        </Link>
                    </span>
                </p>
            </div>
        </form>
    );
};
export default LogInForm;
