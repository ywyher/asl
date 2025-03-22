import AnimeData from "@/app/info/[id]/_components/anime-data";
import Files from "@/app/watch/[id]/[ep]/_components/files";

export default async function Watch({ params }: { params: { id: string, ep: string } }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const ep = resolvedParams.ep;

    return (
      <div className="flex flex-col">
        <Files id={id} ep={ep} />
      </div>
    );
}