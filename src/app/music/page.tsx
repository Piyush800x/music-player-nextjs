import MusicPlayer from "@/components/MusicPlayer"
import { getMusicURL } from "@/lib/aws";


interface Track {
    id: string
}

export default async function Musics() {
    const track: any = "weeknd/01.Starboy"

    // const data = await getMusicURL(track);
    // console.log(data);

    // useEffect(() => {async () => {
    //     const res = await fetch("/api/s3", {"body": "01. Starboy.flac"});
    //     console.log(res);
    //     setTrack(res.data);
    // }})
    // const track1 = `${process.env.TRACK1}`;
    // const track2 = `${process.env.TRACK2}`;
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Music</h1>
            <MusicPlayer track={track}/>
        </div>
    )
}