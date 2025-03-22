import Subs from "@/app/subs/[id]/[ep]/_components/subs";

export default async function Watch({ params }: { params: { id: string, ep: string } }) {
    const { id, ep } = await params;

    return (
      <div className="container mx-auto px-4 py-6">
        <Subs id={id} ep={ep} />
      </div>
    );
}