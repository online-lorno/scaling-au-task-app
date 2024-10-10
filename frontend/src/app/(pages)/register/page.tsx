import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_TOKEN } from "@/lib/constants";

export default function Register() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (token) {
    redirect("/");
  }

  return <h1>Register Page</h1>;
}
