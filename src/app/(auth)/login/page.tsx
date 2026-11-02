import FormContainer from "@/components/formContainer/FormContainer";
import LogInForm from "@/components/Form/LogInForm";
import { getOptionalUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const safePath = (value?: string): string => {
    // to allow the internal paths, never the full URLs,
    return value && value.startsWith("/") && !value.startsWith("//")
        ? value
        : "/profile";
};

const LoginContent = async ({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) => {
    const { redirect: target } = await searchParams;
    const redirectTo = safePath(target);

    const user = await getOptionalUser();
    // if already login, go straight there
    if (user) redirect(redirectTo);

    return <LogInForm redirectTo={redirectTo} />;
};

const LoginPage = ({ searchParams }: PageProps<"/login">) => {
    return (
        <FormContainer>
            <div className="form">
                <h1 className="text-3xl mb-8">Log In</h1>
                <Suspense fallback={null}>
                    <LoginContent searchParams={searchParams} />
                </Suspense>
            </div>
        </FormContainer>
    );
};
export default LoginPage;
