import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import Word, { IWord } from "./Word";

export default function DayList() {
  const { day } = useParams<{ day: string }>();

  const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);
  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>LOADING ...</span>}
      <table>
        <tbody>
          {words.map((word) => {
            return <Word word={word} key={word.id} />;
          })}
        </tbody>
      </table>
    </>
  );
}
