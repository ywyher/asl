import Subs from "@/app/subs/[id]/[ep]/_components/subs";

export default async function Watch({ params: { id, ep } }: { params: { id: string, ep: string } }) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Subs id={id} ep={ep} />
      </div>
    );
}