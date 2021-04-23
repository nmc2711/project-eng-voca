import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import useFetch from "../hooks/useFetch";

import { IDay } from "./DayList";
export default function CreateWord() {
  const history = useHistory();
  const days: IDay[] = useFetch("http://localhost:3001/days");

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;
      if (eng.length > 0 && kor.length > 0) {
        setIsLoading(true);
        fetch(`http://localhost:3001/words/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day,
            eng,
            kor,
            isDone: false,
          }),
        }).then((res) => {
          if (res.ok) {
            alert("생성이 완료되었습니다 ! ");
            history.push(`/day/${day}`);
            setIsLoading(false);
          }
        });
      } else {
        alert("한글자 이상 입력해주세요 !");
      }
    }
  }

  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef}></input>
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef}></input>
      </div>
      <div className="input_area">
        <select ref={dayRef}>
          {days.map((day) => {
            return (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            );
          })}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? "0.3" : "1",
        }}
      >
        {isLoading ? "저장중.." : "저장"}
      </button>
    </form>
  );
}
