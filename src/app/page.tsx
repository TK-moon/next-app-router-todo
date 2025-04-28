import { Main } from "@/domains/main";
import { getServerSession } from "@/lib/auth";
import { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Main />;
};

export default Home;
