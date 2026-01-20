import { getMe } from "@/http/get-me";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export default async function LoginPage() {
  const user = await getMe();
  if (user.data) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
