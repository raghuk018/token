import "./globals.css";

export const metadata = {
  title: "Hospital Token System",
  description: "Manage hospital tokens and patients",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-6 bg-gray-100">{children}</body>
    </html>
  );
}
