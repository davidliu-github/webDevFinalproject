import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Quiz } from "./client";
export default function UserTable() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const fetchQuizzes = async () => {
    const quizzes = await client.findAllQuizzes();
    setQuizzes(quizzes);
  };
  useEffect(() => { fetchQuizzes(); }, []);
  return (
    <div>
      console.log({quizzes.length})
    </div>
  );
}
