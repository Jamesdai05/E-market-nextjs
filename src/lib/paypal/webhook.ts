import "server-only";

// The server SDK has no webhook helpers, so these call PayPal's REST API directly.
const PAYPAL_API_BASE =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error("PayPal client ID or secret is not configured");
    }

    const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`PayPal OAuth failed with status ${res.status}`);
    }

    const data = (await res.json()) as { access_token: string };
    return data.access_token;
}

// Asks PayPal whether this webhook really came from PayPal for our webhook ID.
export async function verifyPayPalWebhook(
    headers: Headers,
    rawBody: string,
): Promise<boolean> {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
        throw new Error("PAYPAL_WEBHOOK_ID is not configured");
    }

    const authAlgo = headers.get("paypal-auth-algo");
    const certUrl = headers.get("paypal-cert-url");
    const transmissionId = headers.get("paypal-transmission-id");
    const transmissionSig = headers.get("paypal-transmission-sig");
    const transmissionTime = headers.get("paypal-transmission-time");

    if (
        !authAlgo ||
        !certUrl ||
        !transmissionId ||
        !transmissionSig ||
        !transmissionTime
    ) {
        return false;
    }

    const accessToken = await getAccessToken();

    // The raw body is inserted as-is: parsing and re-stringifying it could
    // change its bytes and make the signature check fail.
    const verifyBody = `{"auth_algo":${JSON.stringify(authAlgo)},"cert_url":${JSON.stringify(certUrl)},"transmission_id":${JSON.stringify(transmissionId)},"transmission_sig":${JSON.stringify(transmissionSig)},"transmission_time":${JSON.stringify(transmissionTime)},"webhook_id":${JSON.stringify(webhookId)},"webhook_event":${rawBody}}`;

    const res = await fetch(
        `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: verifyBody,
            cache: "no-store",
        },
    );
    if (!res.ok) {
        throw new Error(`PayPal webhook verification failed with status ${res.status}`);
    }

    const data = (await res.json()) as { verification_status?: string };
    return data.verification_status === "SUCCESS";
}
