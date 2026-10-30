"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type ProfileFormProps = {
    name: string;
    email: string;
};

const ProfileForm = ({ name, email }: ProfileFormProps) => {
    return (
        <form
            action=""
            className="flex flex-col items-center justify-center gap-6 p-8 border-2"
        >
            <div className="form-group">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    defaultValue={name}
                    placeholder="enter your name"
                    className="w-80"
                />
            </div>
            <div className="form-group">
                <Label htmlFor="Email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value="exaple@gmail.com"
                    placeholder="enter the email"
                    defaultValue={email}
                    className="w-80"
                />
            </div>
            <div className="form-group">
                <Button className="text-nav-foreground bg-nav">Update</Button>
            </div>
        </form>
    );
};
export default ProfileForm;
