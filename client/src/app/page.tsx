import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies(); // Await the cookies promise
  const token = cookieStore.get("token")?.value;

  redirect(token ? "/dashboard" : "/login"); // Redirect based on token presence
  return null; // Ensure no UI is rendered
}
