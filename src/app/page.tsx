import { redirect } from "next/navigation";

import SignIn from "./SignIn";
import { getSession } from "./lib/commonFunction";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/main");
  }
  return <SignIn />;
}
