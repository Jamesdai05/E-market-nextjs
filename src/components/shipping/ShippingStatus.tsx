"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const steps = [
    { label: "Sign In", href: "null" },
    { label: "Shipping", href: "/shipping" },
    { label: "Payment", href: "/payment" },
    { label: "Place Order", href: "/placeorder" },
];

type stepProps = {
    currentStep: 1 | 2 | 3 | 4;
};

const CheckOutSteps = ({ currentStep }: stepProps) => {
  const pathname = usePathname();

  // find the step we are on from the url
  const currentIndex = steps.findIndex(s => s.href === pathname);
  const current = currentIndex === -1 ? 1 : currentIndex;
  

    return (
        <nav aria-label="Checkout progress" className="mb-8">
            <ol className="flex justify-center items-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isDone = currentStep > stepNumber;
                    const isCurrent = currentStep === stepNumber;
                    const isLast = currentStep === steps.length - 1;

                    const className = cn(
                        "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                        isDone &&
                            "border-primary bg-primary text-primary-foreground",
                        isCurrent && "border-primary bg-primary",
                        !isDone &&
                            !isCurrent &&
                            "border-muted-foreground/30 text-muted-foreground",
                    );

                    const content = (
                        <span className="flex flex-col justify-center items-center gap-4 w-30 mt-10">
                            <span className={className}>
                                {isDone ? (
                                    <Check className="size-4" />
                                ) : (
                                    stepNumber
                                )}
                            </span>
                            <span
                                className={cn(
                                    "text-xs sm:text-sm",
                                    isCurrent
                                        ? "font-semibold text-foreground"
                                        : "text-muted-foreground",
                                )}
                            >
                                {step.label}
                            </span>
                        </span>
                    );

                    return (
                        <li key={step.href}>
                            {isDone ? (
                                // completed steps: clickable, so the user can go back
                                <Link
                                    href={step.href}
                                    className="rounded-md hover:opacity-80"
                                >
                                    {content}
                                </Link>
                            ) : (
                                // current + upcoming steps:not clickable
                                <span
                                    aria-current={
                                        isCurrent ? "step" : undefined
                                    }
                                >
                                    {content}
                                </span>
                            )}
                            {/* connector line between steps */}
                            {!isLast && (
                                <span
                                    className={cn(
                                        "mx-2 mb-5 h-0.5 w-8 sm:w-16",
                                        isDone
                                            ? "bg-primary"
                                            : "bg-muted-foreground/30",
                                    )}
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
export default CheckOutSteps;
