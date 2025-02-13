import UserInfo from "@/components/UserInfo";
import { currentUser } from "@/lib/auth";

async function ServerPage() {
  const user = await currentUser();
  return <UserInfo label={"Server component"} user={user} />;
}

export default ServerPage;
