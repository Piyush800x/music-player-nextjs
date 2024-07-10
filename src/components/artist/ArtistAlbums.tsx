import React from "react";
import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";

export interface ArtistName {
  artistName: string;
}

const ArtistAlbums: React.FC<ArtistName> = ({ artistName }) => {
  return (
    <>
      {/* Main container */}
      <div className="p-8 flex gap-4">
        {/* Artist profile container */}
        <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4  flex flex-col w-2/5">
          {/* Cover and PFP */}
          <div className="flex flex-col">
            {/* Cover image */}
            <Image
              src={"/artists_covers/weekend_cover.webp"}
              alt="weekend"
              height={100}
              width={500}
              className="rounded-md object-cover h-3/5"
            />
            <div className="flex justify-center w-full relative">
              {/* Profile picture */}
              <Image
                src={"/artists_pfp/weekend_pfp.webp"}
                alt="weekend"
                height={200}
                width={500}
                className="rounded-full size-40 z-10 absolute -top-24"
              />
            </div>
          </div>
          <h1 className="pt-15 text-center font-semibold text-3xl">
            {artistName}
          </h1>

          {/* Artist albums */}
          <h1 className="font-semibold text-2xl py-2">Albums</h1>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4  flex flex-row justify-between  font-semibold">
            <h1>Starboy</h1>
            <h1>2022</h1>
          </div>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between  font-semibold">
            <h1>Starboy</h1>
            <h1>2022</h1>
          </div>
        </div>

        {/* Artist songs container */}
        <div className="bg-zinc-900 border border-neutral-700 rounded-md w-screen p-4">
          <h1 className="font-semibold text-2xl p-3">Songs</h1>

          {/* Songs */}
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between font-semibold">
            <div className="flex gap-2">
              <PlayIcon className="size-6" />
              <h1>Starboy</h1>
            </div>
            <h1>The Weekend, Daft Punk</h1>
            <h1>2022</h1>
          </div>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between font-semibold">
            <div className="flex gap-2">
              <PlayIcon className="size-6" />
              <h1>Starboy</h1>
            </div>
            <h1>The Weekend, Daft Punk</h1>
            <h1>2022</h1>
          </div>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between font-semibold">
            <div className="flex gap-2">
              <PlayIcon className="size-6" />
              <h1>Starboy</h1>
            </div>
            <h1>The Weekend, Daft Punk</h1>
            <h1>2022</h1>
          </div>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between font-semibold">
            <div className="flex gap-2">
              <PlayIcon className="size-6" />
              <h1>Starboy</h1>
            </div>
            <h1>The Weekend, Daft Punk</h1>
            <h1>2022</h1>
          </div>
          <div className="bg-zinc-900 border border-neutral-700 rounded-md p-4 my-3 flex flex-row justify-between font-semibold">
            <div className="flex gap-2">
              <PlayIcon className="size-6" />
              <h1>Starboy</h1>
            </div>
            <h1>The Weekend, Daft Punk</h1>
            <h1>2022</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistAlbums;
