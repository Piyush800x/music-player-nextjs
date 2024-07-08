import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";

export default function Searchpage() {
  return (
    <>
      {/* Whole container */}
      <div className="flex justify-between py-5 px-6 gap-8">
        {/* Musics section */}
        <div className="w-2/4">
          <h1 className="text-4xl font-bold">Musics</h1>
          {/* Music container */}
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-2 my-3">
            {/* Musics */}
            <div className="flex flex-row py-3 px-3 justify-between items-center">
              <div className="flex gap-3 items-center">
                <Image
                  src={"/music_covers/cruel_summer.webp"}
                  alt="Picture of the author"
                  width={50}
                  height={50}
                  className="rounded-md hover:brightness-50 hover:"
                />
                {/* Music and artist name */}
                <div className="">
                  <h1 className="font-semibold">Cruel Summer</h1>
                  <h1 className="text-zinc-300">Taylor Swift</h1>
                </div>
                <PlayIcon className="size-6" />
              </div>
              <h1>2:58</h1>
            </div>
          </div>
        </div>
        {/* Albums and Artists section */}
        <div className="w-2/4">
          {/* Albums section */}
          <h1 className="text-4xl font-bold">Albums</h1>
          {/* Albums container */}
          <div className="flex gap-8 bg-zinc-900 border border-neutral-700 rounded-md p-6 my-3">
            {/* Album */}
            <div className="flex flex-col gap-3">
              <Image
                src={"/music_covers/1989.webp"}
                alt="1989"
                height={200}
                width={200}
                className="rounded-md hover:brightness-50"
              />
              {/* Year and artist name */}
              <div className="">
                <h1 className="font-semibold">1989 (Taylor’s Version)</h1>
                <h1 className="text-zinc-300">2023 | Taylor Swift</h1>
              </div>
            </div>
          </div>
          {/* Artists section */}
          <h1 className="text-4xl font-bold">Artists</h1>
          {/* Artists container */}
          <div className="flex flex-col gap-4 bg-zinc-900 border border-neutral-700 rounded-md p-6 my-3">
            <Image
              src={"/music_covers/swift.webp"}
              alt="swift"
              height={200}
              width={200}
              className="rounded-full hover:brightness-50"
            />
            {/* Artist name */}
            <div className="">
                <h1 className="font-semibold">Taylor Swift</h1>
                <h1 className="text-zinc-300">Artist</h1>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
