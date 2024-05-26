import Sidebar from "@/components/shared/Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/welcome");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
