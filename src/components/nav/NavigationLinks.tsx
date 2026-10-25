"use client";

import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLink = {
    label: string;
    href: string;
};

export const isPathActive = (pathname: string, href: string) => {
    return href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(href);
};

const NavigationLinks = ({
    links,
    pathname,
}: {
    links: NavLink[];
    pathname: string;
}) => {


    // const navLinks = [
    //     { label: "Home", href: "/" },
    //     { label: "Products", href: "/products" },
    //     { label: "About", href: "/about" },
    // ];

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            className="text-nav-foreground hover:bg-nav-accent hover:text-nav-foreground data-[popup-open]:bg-nav-accent"
                        />
                    }
                >
                    <Menu />
                    <ChevronDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-w-40">
                    {links.map((link) => {
                        const active = isPathActive(pathname, link.href);
                        return (
                            <DropdownMenuItem
                                key={link.href}
                                render={
                                    <Link href={link.href}>{link.label}</Link>
                                }
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    active && "bg-nav text-nav-foreground",
                                )}
                            />
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
export default NavigationLinks;
