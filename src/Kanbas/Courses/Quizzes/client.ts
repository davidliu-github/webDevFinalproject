import axios from 'axios'
const API_BASE = process.env.REACT_APP_API_BASE
const QUIZZES_API = `${API_BASE}/api/quizzes`

export const getQuizByTitle = async (quizTitle: any) => {
  const response = await axios.get(`${QUIZZES_API}/title/${quizTitle}`)
  return response.data
}

export const getQuizzes = async () => {
  const response = await axios.get(`${QUIZZES_API}`)
  return response.data
}

export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz)
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

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question)
  return response.data
}

export const getQuizByQuestionId = async (questionId: string) => {
  const response = await axios.get(`${QUIZZES_API}/questions/${questionId}`)
  return response.data
}

export const updateQuizQuestions = async (quizId: string, questions: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/questions`, questions)
  return response.data
}

export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
  )
  return response.data
}
