import Link from "next/link";

// rendered inside the client Navbar, so it receives the name as a prop
// instead of reading the session itself (session.ts is server-only)
const UserName = ({ name }: { name: string }) => {
  return (
    <Link
      href="/profile"
      className="text-sm text-nav-foreground bg-nav px-2 py-1 outline-1 rounded outline-nav-foreground">
      Hello, {name}!
    </Link>
  )
}
export default UserName;
