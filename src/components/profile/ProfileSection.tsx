import { getCurrentUser } from "@/lib/session";
import ProfileForm from "./ProfileForm";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Separator } from "@/components/ui/separator";

const ProfileSection = async () => {
    const user = await getCurrentUser();
    return <ProfileForm email={user.email} name={user.name} />;
};
export default ProfileSection;
