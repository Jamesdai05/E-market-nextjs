"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "../passwordInput/PasswordInput";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registration } from "@/utils/actions/registration";
import { type RegistrationState } from "@/utils/actions/registration";
import Alert from "../error/Alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initalRegistrationState: RegistrationState = {
    message: "",
    success: false,
    errors: {},
};

const RegisterationForm = () => {
    const [state, formAction, isPending] = useActionState(
        registration,
        initalRegistrationState,
    );

    const router = useRouter();

    useEffect(() => {
        // direct return to prevent showing the message
        if (!state.message) return;
        if (state.success) {
            toast.success("Account has been successfully created!");
            router.replace("/login");
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
                <Label htmlFor="name">Name</Label>
                <Input
                    name="name"
                    placeholder="Enter the name"
                    id="name"
                    autoComplete="name"
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                />
                {state.errors?.name && <Alert>{state.errors.name[0]}</Alert>}
            </div>
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    placeholder="Enter the email"
                    id="email"
                    autoComplete="email"
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                />
                {state.errors?.email && <Alert>{state.errors.email[0]}</Alert>}
            </div>
            <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                    name="password"
                    placeholder="Enter the password"
                    id="password"
                    autoComplete="password"
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                />
                {state.errors?.password && (
                    <Alert>{state.errors.password[0]}</Alert>
                )}
            </div>
            <div className="form-group">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirm the password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    className="w-full min-w-[20em] bg-input text-foreground p-2"
                />
            </div>
            {state.errors?.confirmPassword && (
                <Alert>{state.errors.confirmPassword[0]}</Alert>
            )}
            <Button
                type="submit"
                disabled={isPending}
                className="w-full mt-4 bg-sky-400 font-bold text-nav-foreground hover:bg-nav-foreground hover:text-nav"
            >
                {isPending ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="link flex justify-center">
                <p className="text-sm">
                    Already have an account yet?{" "}
                    <span>
                        <Link
                            href="/login"
                            className="underline text-md hover:text-accent hover:font-bold"
                        >
                            Log In
                        </Link>
                    </span>
                </p>
            </div>
        </form>
    );
};
export default RegisterationForm;
