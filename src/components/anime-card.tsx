import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

const GET_TOP = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      format
    }
  }
`;

export default function AnimeCard({ id }: { id: number }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_TOP, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading anime</p>;

  const anime = data?.Media;

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow m-2"
      onClick={() => router.push(`/info/${anime.id}`)}
    >
      <CardContent className="flex flex-col gap-4 items-center p-2">
        {anime.coverImage?.large && (
          <Image
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            width={200}
            height={300}
            className="rounded-md"
          />
        )}
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-sm text-center font-semibold mt-2">
            {anime.title.english || anime.title.romaji}
          </h3>
          <p className="text-sm text-gray-500">{anime.format}</p>
        </div>
      </CardContent>
    </Card>
  );
}