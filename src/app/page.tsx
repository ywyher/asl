"use client"

import AnimeCard from "@/components/anime-card";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const GET_TOP_ANIME = gql`
  query {
    Page(perPage: 20) {
      media(type: ANIME, sort: SCORE_DESC) {
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
  }
`;

export default function Home() {
    const { data, loading, error } = useQuery(GET_TOP_ANIME);
    
    useEffect(() => {
        console.log(data)
    }, [data])
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading top anime</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.Page.media.map((anime: any) => (
                <AnimeCard key={anime.id} id={anime.id} />
            ))}
        </div>
    )
}