import LoginPage from "@/domains/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
}
