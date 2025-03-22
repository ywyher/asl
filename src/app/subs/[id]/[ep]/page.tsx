import Subs from "@/app/subs/[id]/[ep]/_components/subs";

export default async function Watch({ params }: { params: { id: string, ep: string } }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const ep = resolvedParams.ep;

    return (
      <div className="container mx-auto px-4 py-6">
        <Subs id={id} ep={ep} />
      </div>
    );
}