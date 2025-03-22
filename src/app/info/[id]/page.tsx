import AnimeData from "@/app/info/[id]/_components/data";

export default async function Info({ params }: { params: { id: string } }) {
  const { id } = await params
  
  return (
    <div>
      <AnimeData id={id} />
    </div>
  );
}