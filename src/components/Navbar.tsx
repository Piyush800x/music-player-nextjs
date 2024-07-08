import Link from "next/link";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, EnterIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  return (
    <div className="sticky top-2 bg-neutral-800 rounded-lg py-1.5 px-2.5 mx-32">
      <div className="flex flex-row justify-between items-center">
        {/* Left Items */}
        <div className="flex flex-row gap-6 font-semibold pl-2">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/">Library</Link>
          </div>
          <div>
            <Link href="/">Playlists</Link>
          </div>
        </div>
        {/* SEARCH*/}
        <div className="items-center flex flex-row ">
          <Link href="/" className="absolute z-50 ml-4">
            <MagnifyingGlassIcon className="size-5"/>
          </Link>
          <Input type="search" placeholder="Search for musics" />
        </div>
        {/* Right */}
        <div className="flex items-center pr-2 ml-16">
          <div className="flex flex-row items-center gap-2">
            <EnterIcon className="size-5"/>
            <Link href="/" className="font-semibold">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
