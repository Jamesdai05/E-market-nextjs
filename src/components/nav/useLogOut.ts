"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// shared by the desktop dropdown (UserName) and the mobile sheet (Navbar)
// so both log out the same way
export const useLogOut = () => {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const logOut = async () => {
        setIsPending(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                        // re-render the server-rendered navbar so it drops the logged-in state
                        router.refresh();
                    },
                    // server answered with an error status
                    onError: () => {
                        setIsPending(false);
                        toast.error("Logout failed. Please try again.");
                    },
                },
            });
        } catch {
            // request never reached the server (e.g. offline)
            setIsPending(false);
            toast.error("Logout failed. Check your connection and try again.");
        }
    };

    return { logOut, isPending };
};
