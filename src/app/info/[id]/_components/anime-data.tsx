"use client"

import { Button } from "@/components/ui/button"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const GET_ANIME = gql`
  query($id: Int!) {
    Media(id: $id) {
      id
      idMal
      bannerImage
      format
      title {
        romaji
      }  
      episodes
      coverImage {
        large
      }
    } 
  }
`

export default function AnimeData({ id }: { id: string }) {
    const { loading, error, data } = useQuery(GET_ANIME, { variables: { id: parseInt(id) } })
    const router = useRouter()

    useEffect(() => {
        console.log(data)
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading anime data</p>;

    const anime = data?.Media;
    const episodesArray = Array.from({ length: anime.episodes }, (_, i) => i + 1);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">{anime.title.romaji}</h2>
            <div className="flex flex-wrap gap-2 mt-4">
                {episodesArray.map((episode) => (
                    <Button 
                        key={episode} 
                        className="w-[50px] cursor-pointer"
                        onClick={() => router.push(`/watch/${id}/${episode}`)}
                    >
                        {episode}
                    </Button>
                ))}
            </div>
        </div>
    )
}