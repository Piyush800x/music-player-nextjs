import Navbar from "@/components/Navbar";
import ArtistAlbums from "@/components/artist/ArtistAlbums";

type Props = {
  params: {
    name: string;
  };
};

export default function Artists({ params }: Props) {
  return (
    <>
      <main className="bg-black text-white w-full h-full">
        <Navbar />
        <ArtistAlbums artistName={params.name} />
      </main>
    </>
  );
}
