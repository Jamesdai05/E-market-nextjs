import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// rendered inside the client Navbar, so it receives the name as a prop
// instead of reading the session itself (session.ts is server-only)
const UserName = ({ name }: { name: string }) => {
    return (
        // <Link
        //   href="/profile"
        //   className="text-sm text-nav-foreground bg-nav px-2 py-1 outline-1 rounded outline-nav-foreground">
        //   {name}
        // </Link>
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
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UserName;
