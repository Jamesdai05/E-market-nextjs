import FormContainer from "@/components/formContainer/FormContainer";
import RegisterationForm from "@/components/Form/RegisterationForm";

const RegisterPage = () => {
    return (
        <FormContainer>
            <div className="form">
                <h1 className="text-3xl mb-8">Sign Up</h1>
                <RegisterationForm />
            </div>
        </FormContainer>
    );
};
export default RegisterPage;
