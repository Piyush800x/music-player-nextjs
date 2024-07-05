import Link from "next/link"
import { Input } from "@/components/ui/input"


export default function Navbar() {
    return (
        <div className="sticky backdrop-blur-xl bg-white/20 rounded-xl mx-24">
            <div className="flex flex-row justify-between">
                {/* Left Items */}
                <div className="flex flex-row items-center gap-x-2 pl-2">
                    <div><Link href='/'>Home</Link></div>
                    <div><Link href='/'>Library</Link></div>
                    <div><Link href='/'>Playlists</Link></div>
                </div>
                {/* Center */}
                <div className="items-center "><Input type="search" placeholder="text"/></div>
                {/* Right */}
                <div className="flex items-center pr-2 ml-16">
                    <div><Link href='/'>Sign In</Link></div>
                </div>
            </div>
        </div>
    )
}