import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_TOKEN } from "@/lib/constants";
import TaskList from "@/components/TaskList";
import WeatherStatus from "@/components/WeatherStatus";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_TOKEN);

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <WeatherStatus />
      <TaskList />
    </>
  );
}
