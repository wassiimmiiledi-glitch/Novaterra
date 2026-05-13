import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="min-h-[80vh] flex items-center bg-cream-50">
        <div className="container-x text-center">
          <p className="eyebrow">404 · Lost in the grove</p>
          <h1 className="display text-6xl md:text-8xl mt-6 max-w-[18ch] mx-auto">
            This page took a <em className="italic text-olive-700">long way home.</em>
          </h1>
          <p className="mt-8 max-w-md mx-auto text-ink/65 font-light">
            The page you're looking for doesn't exist — or moved beneath another branch.
          </p>
          <div className="mt-10">
            <Link href="/" className="btn-primary">Return home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
