"use client";

import { useEffect, useState } from "react";
import * as kuromoji from "kuromoji";
import { Mode, Token } from "../types";
import Dialogue from "@/components/Dialogue";
import { parseSubToJson } from "@/lib/fetch-subs";
import { Sub } from "../types";
import { useQuery } from "@tanstack/react-query";


// Frieren ~ Ep 1 ~
const srt = "https://jimaku.cc/entry/729/download/%5Berai-raws-timed%5D-sousou-no-frieren-S1E01.srt";
const vtt = "https://s.megastatics.com/subtitle/9b258ea774bfd06f85f682f4fa38128e/eng-2.vtt"
const ass = "https://jimaku.cc/entry/729/download/%5BNekomoe%20kissaten%5D%20Sousou%20no%20Frieren%20%5B01%5D%5BWeb%5D.JPSC.ass";

export default function Subs() {
  const [mode, setMode] = useState<Mode>('japanese')

  const { data: subs, isLoading } = useQuery({
    queryKey: ['subs', mode],
    queryFn: async () => {
      return await parseSubToJson({ url: srt, format: 'srt', mode: mode })
    },
    staleTime: Infinity,
  })

  return (
    <div className="p-4 w-full">
      <Dialogue
       subs={subs}
       mode={mode}
       setMode={setMode}
       isLoading={isLoading}
      />
    </div>
  );
}