"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOut } from "./useLogOut";

// rendered inside the client Navbar, so it receives the name as a prop
// instead of reading the session itself (session.ts is server-only)
const UserName = ({ name }: { name: string }) => {
    const { logOut, isPending } = useLogOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<Button variant="outline">{name}</Button>}
                className="text-nav hover:underline hover:font-bold hover:bg-accent"
            />
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem render={<Link href="/profile" />}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant="destructive"
                        disabled={isPending}
                        closeOnClick={false}
                        onClick={logOut}
                    >
                        {isPending ? "Logging out…" : "Log Out"}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UserName;
