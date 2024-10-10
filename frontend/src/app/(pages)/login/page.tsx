import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_TOKEN } from "@/lib/constants";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (token) {
    redirect("/");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
