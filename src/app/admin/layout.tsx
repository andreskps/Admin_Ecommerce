import { Sidebar } from "@/components/admin/sidebar/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { getServerSession } from "next-auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (!session) {
  //   return <div>loading...</div>;
  // }

  return (
    <>
      {/* <Sidebar /> */}

      <div className="flex h-screen ">
        <Sidebar />

        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
