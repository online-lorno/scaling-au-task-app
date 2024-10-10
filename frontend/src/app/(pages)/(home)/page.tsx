import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_TOKEN } from "@/lib/constants";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (!token) {
    redirect("/login");
  }

  return <h1>Home Page</h1>;
}
