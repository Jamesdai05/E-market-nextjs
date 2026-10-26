import FormContainer from "@/components/formContainer/FormContainer";
import LogInForm from "@/components/Form/LogInForm";


const LoginPage = () => {
    return (
        <FormContainer>
            <div className="form">
                <h1 className="text-3xl mb-8">Log In</h1>
                <LogInForm />
            </div>
        </FormContainer>
    );
};
export default LoginPage;
