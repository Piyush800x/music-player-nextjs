import MusicPlayer from "@/components/MusicPlayer"


interface Track {
    id: string
}

export default async function Musics() {
    const track: any = "weeknd/AfterHours"

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Music</h1>
            <MusicPlayer track={track}/>
        </div>
    )
}