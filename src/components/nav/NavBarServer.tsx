import { getOptionalUser } from "@/lib/session";
import Navbar from "./Navbar";

// server component: reads the session, then passes plain data to the client Navbar
const NavBarServer = async () => {
  const user = await getOptionalUser();

  return <Navbar name={user?.name ?? null} />;
};
export default NavBarServer;
