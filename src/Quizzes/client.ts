import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export interface Quiz { _id: string; quizType: string; points: number; assignmentGroup: string; };

export const findAllQuizzes = async () => {
    const response = await axios.get(`${QUIZZES_API}`);
    return response.data;
  };
  
