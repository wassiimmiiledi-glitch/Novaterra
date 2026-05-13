import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
}
