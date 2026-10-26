import FormContainer from "@/components/formContainer/FormContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    return (
        <FormContainer>
            <div className="flex flex-col max-w-md px-16 py-8 rounded-lg items-center shadow-sm">
                <h1 className="text-3xl">Log In</h1>
                <form
                    action=""
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <div className="form-group">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="Enter the email"
                            id="email"
                            className="p-2 placehoder:text-lg placehoder:text-lg"
                        ></Input>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            placeholder="Enter the password"
                            id="password"
                            className="p-2 placehoder:text-lg placehoder:text-lg"
                        ></Input>
                    </div>
                    <div className="buttons">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </FormContainer>
    );
};
export default LoginPage;
