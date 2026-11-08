import "server-only";

const PAYPAL_API = process.env.PAYPAL_API_URL!;

// get an access token from PayPal using your client id + secret
const getAccessToken = async () => {
    const auth = Buffer.from(
        `{process.env.PAYPAL_CLIENT_ID}: ${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Paypal authentication failed:${response.status}`);
    }

    const data: {
        access_token: string;
        token_type: string;
        expires_in: number;
    } = await response.json();

    return data.access_token;
};

const createPayPalOrder