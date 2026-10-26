"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "../passwordInput/PasswordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
useActionState


const RegisterationForm = () => {
    const []


    return (
        <form action="" className="flex flex-col items-center justify-center gap-4">
            <div className="form-group">
                <Label htmlFor="name">Name</Label>
                <Input
                    name="name"
                    placeholder="Enter the name"
                    id="name"
                    autoComplete="name"
                    className="w-full min-w-[20em] bg-input p-2"
                    required
                />
            </div>
            <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    placeholder="Enter the email"
                    id="email"
                    autoComplete="email"
                    className="w-full min-w-[20em] bg-input p-2"
                    required
                />
            </div>
            <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                    name="password"
                    placeholder="Enter the password"
                    id="password"
                    autoComplete="password"
                    className="w-full min-w-[20em] bg-input p-2"
                    required
                />
            </div>
            <div className="form-group">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                    name="confirmPassword"
                    placeholder="Confirm the password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    className="w-full min-w-[20em] bg-input p-2"
                    required
                />
            </div>
            {/* <div className="form-group">
                <Label htmlFor="password">Password</Label>
                <PasswordInput />
            </div> */}
            <Button
                type="submit"
                className="w-full mt-4 bg-sky-400 font-bold text-nav-foreground hover:bg-nav-foreground hover:text-nav"
            >
                Submit
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
