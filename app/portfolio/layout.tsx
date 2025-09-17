import Navbar from "@/components/Navbar";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 xl:px-0">{children}</main>
    </div>
  );
}
