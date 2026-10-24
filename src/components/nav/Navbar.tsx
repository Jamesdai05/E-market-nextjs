"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Menu, ShoppingBasket } from "lucide-react";

import SearchComponent from "./SearchComponent";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavigationLinks from "./NavigationLinks";
import Cart from "./Cart";

// for mobile style
const navLinkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-nav-foreground transition-colors hover:bg-nav-accent hover:text-nav-foreground focus:bg-nav-accent focus:text-nav-foreground";
const navLinkActiveClass = "bg-nav-accent text-nav-foreground";

const authButtonClass = cn(
    buttonVariants({ variant: "outline" }),
    "bg-nav text-nav-foreground border-nav-foreground/50 hover:bg-nav-foreground hover:text-nav",
);

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-nav text-nav-foreground shadow-md shadow-nav-accent/20">
            <nav
                aria-label="Main"
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"
            >
                <Link href="/" className="flex justify-center items-center">
                    <span className="flex size-10 items-center justify-center rounded-md bg-nav-foreground text-nav mr-1">
                        <ShoppingBasket />
                    </span>{" "}
                    <span className="text-lg font-bold tracking-tight">
                        Mini-Mart
                    </span>
                </Link>

                {/* desktop navigation */}
                {/* <div className="hidden md:flex max-w-2xl"> */}
                <SearchComponent className="hidden text-lg mx-auto max-w-md md:flex" />

                {/* desktop authentication */}
                <div className="hidden shirnk-0 items-center gap-2 max-w-md md:flex">
                    <NavigationLinks links={navLinks} pathname={pathname} />
                    <Cart />
                    <Link
                        href="/login"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "bg-nav text-nav-foreground border-nav-foreground/50",
                            "hover:bg-nav-foreground hover:text-nav",
                        )}
                    >
                        Login
                    </Link>
                    {/* <Link
                        href="/register"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "bg-nav text-nav-foreground border-nav-foreground/50",
                            "hover:bg-nav-foreground hover:text-nav",
                        )}
                    >
                        Register
                    </Link> */}
                </div>
                {/* mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="Open menu"
                                    className="bg-transparent text-nav-foreground border-nav-foreground/50 hover:bg-nav-accent hover:text-nav-foreground"
                                />
                            }
                        >
                            <Menu className="size-5" />
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            // to style the sheet button
                            className={cn(
                                "bg-nav text-nav-foreground border-nav-accent",
                                "[&_[data-slot=sheet-close]]:text-nav-foreground",
                                "[&_[data-slot=sheet-close]:hover]:bg-nav-accent",
                                "[&_[data-slot=sheet-close]:hover]:text-nav-foreground",
                            )}
                        >
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2 text-nav-foreground">
                                    <ShoppingBasket className="size-5" />
                                    Mini-Mart
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex mt-4 flex-col gap-2 px-2">
                                <Link href="/login" className={authButtonClass}>
                                    Login
                                </Link>
                                {/* <Link
                                    href="/register"
                                    className={authButtonClass}
                                >
                                    Register
                                </Link> */}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
