import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Painel Administrativo",
    template: "%s | Painel Talentos RH",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
