import Navbar from "@/components/Navbar";
import Searchpage from "@/components/Searchpage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black text-white w-full h-full">
      <div className="py-3">
        <Navbar />
        <Searchpage />
      </div>
    </main>
  );
}
