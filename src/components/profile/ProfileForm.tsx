"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type ProfileFormProps = {
  name: string;
  email: string;
};

const ProfileForm = ({ name, email }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) =>
    startTransition(async () => {
      const newName = String(formData.get("name") ?? "").trim();
      const updatedEmail = String(formData.get("email") ?? "").trim();

      startTransition(async () => {
        // make sure the name is changed and it is not null;
        if (newName && newName !== name) {
          const { error } = await authClient.updateUser({ name: newName });
          if (error) {
            toast.error(error.message ?? "Error in updating user's name!");
            return;
          }
        }

        if (email && updatedEmail !== email) {
          const { error } = await authClient.changeEmail({
            newEmail: updatedEmail,
            callbackURL: "/profile",
          });

          if (error) {
            toast.error(error.message ?? "Error in updating user email!");
            return;
          }
          toast.success("User profile updated!");
          router.refresh();
        }
      });
    });

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center justify-center gap-6 p-8 border-2"
    >
      <div className="form-group">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
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
          name="email"
          value={email}
          placeholder="enter the email"
          defaultValue={email}
          className="w-80"
        />
      </div>
      <div className="form-group">
        <Button variant="linkBtn" type="submit" disabled={isPending}>
          {isPending ? "Uploading..." : "Update"}
        </Button>
      </div>
    </form>
  );
};
export default ProfileForm;
