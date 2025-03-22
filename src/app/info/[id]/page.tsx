import AnimeData from "@/app/info/[id]/_components/data";

export default async function Info({ params: { id } }: { params: { id: string } }) {
    return (
      <div>
        <AnimeData id={id} />
      </div>
    );
}