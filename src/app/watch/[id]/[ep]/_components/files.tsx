"use client"

import { Mode } from "@/app/types";
import { filterFiles, selectFile } from "@/app/watch/[id]/[ep]/_components/funcs";
import { File } from "@/app/watch/[id]/[ep]/types";
import Dialogue from "@/components/Dialogue";
import { parseSubToJson } from "@/lib/fetch-subs";
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function Files({ id, ep }: { id: string, ep: string }) {
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const [mode, setMode] = useState<Mode>('japanese')

    const { data: searchData, isLoading: isLoadingSearch, error: searchError } = useQuery({
        queryKey: ['anime', 'search', id],
        queryFn: async () => {
            const response = await fetch(`https://jimaku.cc/api/entries/search?anilist_id=${id}`, {
                headers: {
                    "Authorization": 'AAAAAAAABfYuAS66uld8Q19m5bLfkmV0yAJUhmTTqXpDuh8ef0OGVFConw'
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        }
    });

    const animeId = searchData?.[0]?.id;

    const { data: filesData, isLoading: isLoadingFiles, error: filesError } = useQuery({
        queryKey: ['anime', 'files', animeId],
        queryFn: async () => {
            if (!animeId) throw new Error("Anime ID not found");

            const response = await fetch(`https://jimaku.cc/api/entries/${animeId}/files?episode=${ep}`, {
                headers: {
                    "Authorization": 'AAAAAAAABfYuAS66uld8Q19m5bLfkmV0yAJUhmTTqXpDuh8ef0OGVFConw'
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        },
        enabled: !!animeId // Only run this query when animeId is available.
    });

    const { data: subs, isLoading: isLoadingSubs, error: subsError } = useQuery({
        queryKey: ['subs', mode],
        queryFn: async () => {
            if(selectedFile && selectedFile.url) return await parseSubToJson({ url: selectedFile.url, format: 'srt', mode: mode })
            else throw new Error("Coudn't get the file")
        },
        staleTime: Infinity,
        enabled: !!selectedFile?.url
    })

    useEffect(() => {
        if(filesData) {
            const filteredFiles = filterFiles(filesData)
            const selectedFile = selectFile(filteredFiles)
            setSelectedFile(selectedFile)
        }
    }, [filesData]);

    if (isLoadingSearch) return <>Searching...</>;
    if (isLoadingFiles) return <>Loading Files...</>;
    if (isLoadingSubs) return <>Loading Subs...</>;
    if (searchError) return <>Error: {searchError.message}</>;
    if (filesError) return <>Error: {filesError.message}</>;
    if (subsError) return <>Error: {subsError.message}</>;

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-center text-2xl">Files</h2>
            {subs && selectedFile && !isLoadingSubs ? (
                <Dialogue
                    subs={subs}
                    mode={mode}
                    setMode={setMode}
                    isLoading={isLoadingSubs}
                />
            ): (
                <>No file was found</>
            )}
        </div>
    );
}