'use client';

import MusicPlayer from "@/components/MusicPlayer"

export default async function Musics() {

    const track1 = `${process.env.TRACK1}`;
    const track2 = `${process.env.TRACK2}`;
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Music</h1>
            <MusicPlayer track={track1}/>
        </div>
    )
}