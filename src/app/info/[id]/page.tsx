import AnimeData from "@/app/info/[id]/_components/anime-data";

export default async function Info({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return (
      <div>
        <AnimeData id={id} />
      </div>
    );
}