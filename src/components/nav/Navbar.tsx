"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Menu, ShoppingBasket } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "../ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";

const isPathActive = (pathname: string, href: string) => {
    return href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(href);
};

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header
            aria-label="Main"
            className="sticky top-0 z-50 w-full border-b bg-nav text-nav-foreground shadow-md shadow-nav-accent/20"
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="flex justify-center items-center">
                    <span className="flex size-10 items-center justify-center rounded-md bg-nav text-nav-foreground">
                        <ShoppingBasket />
                    </span>
                    Mini-Mart
                </Link>

                {/* desktop navigation */}
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => {
                                const active = isPathActive(
                                    pathname,
                                    link.href,
                                );
                                return (
                                    <NavigationMenuItem key={link.href}>
                                        <NavigationMenuLink
                                            active={active}
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            render={<Link href={link.href} />}
                                            className={cn(
                                                "rounded-md px-3 py-2 font-medium text-nav-foreground transition-colors",
                                                "hover:bg-nav-accent hover:text-nav-foreground",
                                                "focus-visible:text-nav-foreground focus:bg-nav-accent",
                                                "aria-[current=page]:bg-nav-accent! data-active:text-nav-foreground",
                                            )}
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* desktop authentication */}
                <div className="hidden items-center gap-2 md:flex">
                    <Link
                        href="/login"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "bg-nav text-nav-foreground hover:bg-nav-foreground hover:text-nav",
                        )}
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "bg-nav text-nav-foreground hover:bg-nav-foreground hover:text-nav",
                        )}
                    >
                        Register
                    </Link>
                </div>
                {/* mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            render={<Button variant="outline" size="icon" />}
                        >
                            <Menu className="w-5 h-5" />
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Logo</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 px-2">
                                {navLinks.map((link) => {
                                    const active = isPathActive(
                                        pathname,
                                        link.href,
                                    );
                                    return (
                                        <Link
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            key={link.href}
                                            className={cn(
                                                "rounded-md p-2 text-sm font-medium hover:bg-sky-500 hover:text-white",
                                                active &&
                                                    "bg-sky-500 text-white",
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="flex mt-4 flex-col gap-2">
                                <Link
                                    href="/login"
                                    className={buttonVariants({
                                        variant: "default",
                                    })}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className={buttonVariants({
                                        variant: "outline",
                                    })}
                                >
                                    Register
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
