"use client";
import uuid from "react-uuid";
import SelectionModal from "./selectionModal";
import Typingdiv from "./typingdiv";
import { letterType } from "@/types/textArray";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/globalContext";

export default function Home() {
  const text: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    // "Lorem ";
  const {setCurrentIndex, setPerSecondState, setPerSecondStatsArray}  = useGlobalContext()

  // id of all the letter in the text
  const charIdArr2: string[] = [];

  const wordarr: letterType[] = text.split("").map((each) => {
    // push id to 
    const cache1 = uuid();
    charIdArr2.push(cache1);
    return {
      id: cache1,
      letter: each,
      state: "pending",
      hidden: false,
    };
  });

  const [charIdArr, setCharIdArr] = useState<string[]>(charIdArr2)

  useEffect(() => {
    // defaulting
    console.log("defaulting")
    setPerSecondStatsArray([]);
    setPerSecondState({
      correct: 0,
      wrong: 0,
    });

    
  }, []);

  // array of letters
  const [textArray, setTextArray] = useState<letterType[]>(wordarr);

  useEffect(() => {
    setCurrentIndex(0)
  }, [])
  

  return (
    <div className="">
      <SelectionModal />
      <Typingdiv
        textArray={textArray}
        setTextArray={setTextArray}
        charIdArr={charIdArr}
      />
    </div>
  );
}
