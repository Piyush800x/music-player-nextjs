'use client'
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, EnterIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      onSearch(query);
    }
  }


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
          <form onSubmit={handleSumbit}>
            <button type="submit" className="absolute z-50 ml-4 mt-2"><MagnifyingGlassIcon className="size-5"/></button>
            {/* <Link type="submit" className="absolute z-50 ml-4">
              <MagnifyingGlassIcon className="size-5"/>
            </Link> */}
            <Input className="border-white border ring-0 outline-1" type="search" placeholder="Search for musics" typeof="text" value={query} onChange={(e) => {setQuery(e.target.value)}}/>
          </form>
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
