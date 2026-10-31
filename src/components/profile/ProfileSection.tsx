import { getCurrentUser } from "@/lib/session";
import ProfileForm from "./ProfileForm";


const ProfileSection = async () => {
    const user = await getCurrentUser();
    return <ProfileForm email={user.email} name={user.name} />;
};
export default ProfileSection;
