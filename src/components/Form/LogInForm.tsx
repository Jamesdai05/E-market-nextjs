"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "../passwordInput/PasswordInput";
import Link from "next/link";
import { type LoginState } from "@/utils/actions/loginAction";
import { useActionState, useEffect } from "react";
import { login } from "@/utils/actions/loginAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Alert from "../error/Alert";

const initalState: LoginState = {
    message: "",
    success: false,
    errors: {},
};

const LogInForm = () => {
    const [state, formAction, isPending] = useActionState(login, initalState);
    const router = useRouter();

    useEffect(() => {
        if (!state.message) return;
        if (state.success) {
            toast.success("Login successfully");
            router.replace("/profile");
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="flex flex-col justify-center gap-4"
        >
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    placeholder="Enter the email"
                    id="email"
                    autoComplete="email"
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                />
            </div>
            {state.errors?.email && <Alert>{state.errors?.email[0]}</Alert>}
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
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                    placeholder="Enter the password"
                    aria-label="password"
                    autoComplete="password"
                    name="password"
                />
            </div>
            {state.errors?.password && (
                <Alert>{state.errors?.password[0]}</Alert>
            )}
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
