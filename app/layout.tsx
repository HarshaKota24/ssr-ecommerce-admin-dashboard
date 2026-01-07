import "./globals.css";
import { getServerSession } from "next-auth";
import Sidebar from "./components/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {session ? (
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 ml-64">{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
