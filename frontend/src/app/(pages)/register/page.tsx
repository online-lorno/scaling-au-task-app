import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_TOKEN } from "@/lib/constants";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (token) {
    redirect("/");
  }

  return <RegisterForm />;
}
