import Navbar from "@/components/Navbar";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-youtube-dark-bg transition-colors">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 xl:px-0 pt-4 pb-8">{children}</main>
    </div>
  );
}