import { createAuthClient } from "better-auth/react";

// no baseURL: the auth API lives on this same app (/api/auth), so the client
// uses the current origin. BETTER_AUTH_URL is server-only and is undefined here.
export const authClient = createAuthClient();
