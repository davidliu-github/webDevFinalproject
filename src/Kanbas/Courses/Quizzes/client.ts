import axios from 'axios'
const API_BASE = process.env.REACT_APP_API_BASE
const QUIZZES_API = `${API_BASE}/api/quizzes`

export const getQuiz = async (title: any) => {
  const response = await axios.get(`${QUIZZES_API}/${title}/quizzes`)
  return response.data
}

export const getQuizzes = async () => {
  const response = await axios.get(`${QUIZZES_API}`)
  return response.data
}

export const createQuiz = async (title: any, quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}/${title}/quizzes`, quiz)
  return response.data
}

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz)
  return response.data
}

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`)
  return response.data
}