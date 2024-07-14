'use client';
import Navbar from "@/components/Navbar";
import Searchpage from "@/components/Searchpage";
import Image from "next/image";
import MusicPlayer from "@/components/MusicPlayer";
import { useState } from "react";
import { ObjectId } from "mongodb";

interface Song {
  _id: string;
  name: string;
  album_id: ObjectId;
  artist_id: ObjectId;
  song_file_name: string
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [playPerformed, setPlayPerformed] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>('');

  const handlePlay = async (fileName: string) => {
    setCurrentSong(fileName);
    setPlayPerformed(true);
  }

  const handleSearch = async (query: string) => {
    console.log(`Front Q: ${query}`);
    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    setSongs(data.songs);
    setSearchPerformed(true)
    console.log(`Songs: ${data.songs}`);
  }
  const track: any = "weeknd/01.Starboy";

  return (
    <main className="bg-black text-white w-full h-screen">
      <div className="py-3">
        <Navbar onSearch={handleSearch}/>
        {searchPerformed && <Searchpage songs={songs} onSend={handlePlay}/>}
        {playPerformed && <MusicPlayer track={currentSong}/>}
      </div>
    </main>
  );
}
