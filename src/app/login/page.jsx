import { redirect } from "next/navigation";

import { authenticateUser } from "./actions";

import Login from "@/components/user/Login";

export default async function LoginPage() {
  const user = await authenticateUser();

  if (user) {
    redirect("/");
  }
  return <Login />;
}
