"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";

type passwordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

const PasswordInput = ({ className, ...props }: passwordInputProps) => {
    const [showpassword, setShowpassword] = useState(false);

    const type = showpassword ? "text" : "password";

    const togglePassword = () => setShowpassword((prev) => !prev);

    return (
        <div className="w-full relative">
            <Input {...props} type={type} className={className} />
            <Button
                className="absolute top-1/2 right-1 -translate-y-1/2 bg-gray-200 text-nav-accent"
                variant="ghost"
                size="icon"
                onClick={togglePassword}
            >
                {showpassword ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </Button>
        </div>
    );
};
export default PasswordInput;
