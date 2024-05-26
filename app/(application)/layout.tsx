import Navbar from "@/components/shared/Navbar";
export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
