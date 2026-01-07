import "./globals.css";
import { getServerSession } from "next-auth";
import ClientLayout from "./components/ClientLayout";

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
          <ClientLayout>{children}</ClientLayout>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
