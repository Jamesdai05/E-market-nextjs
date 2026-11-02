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

const CheckOutSteps = () => {
  const pathname = usePathname();

  // find the step we are on from the url
  const currentIndex = steps.findIndex(s => s.href === pathname);
  const current = currentIndex === -1 ? 1 : currentIndex;


    return (
        <nav aria-label="Checkout progress" className="mb-8">
            <ol className="flex justify-center items-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isDone = index < current;
                    const isCurrent = index === current;
                    const isLast = index === steps.length - 1;

                    const className = cn(
                        "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                        isDone &&
                            "border-primary bg-primary text-primary-foreground",
                        isCurrent && "border-primary text-primary",
                        !isDone &&
                            !isCurrent &&
                            "border-muted-foreground/30 text-muted-foreground",
                    );

                    const content = (
                        <span className="flex flex-col items-center gap-4 mt-10">
                            <span className={className}>
                                {isDone ? (
                                    <Check className="size-4" />
                                ) : (
                                    index+1
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
                        <li key={step.href} className="flex items-center">
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
                                    className="text-nav"
                                >
                                    {content}
                                </span>
                            )}
                            {/* connector line between steps */}
                            {!isLast && (
                                <span
                                    className={cn(
                                        "mx-2 mt-14 h-1 w-8 shrink-0 -translate-y-1/2 self-start sm:w-16",
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
