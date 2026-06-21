import "./globals.css";

export const metadata = {
  title: "Project Management",
  description: "Project Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}