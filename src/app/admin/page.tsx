import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Logout } from "@/components/component/logout";


export default async function AdminPage() {
   
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <div>
       <Logout />
    </div>
  );
}