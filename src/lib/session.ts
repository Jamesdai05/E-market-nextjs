import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { cache } from "react";
import { connection } from "next/server";

// type UserRole = "admin" | "user";

const getCurrentSession = cache(async () => {
    await connection();
    return auth.api.getSession({ headers: await headers() });
});

const getOptionalUser = async () => {
    const session = await getCurrentSession();

    return session?.user ?? null;
};

const getCurrentUser = async () => {
    const session = await getCurrentSession();
    if (!session) redirect("/login");

    const user = session.user;

    return user;
};

export { getCurrentUser, getOptionalUser, getCurrentSession };
