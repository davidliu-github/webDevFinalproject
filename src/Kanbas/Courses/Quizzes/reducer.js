import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizzes: [],
  quiz: { _id: "", quizType: "GRADED_QUIZ", points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 0, multipleAttempts: false, showCorrectAnswers: false, accessCode: "1234", oneQuestionAtATime: true, webcamRequired: false, lockQuestion: false, dueDate: "2222-1-1", availableDate: "2222-1-1", untilDate: "2222-1-1", published: false, title: "blank", questions: 0},
}

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload
    },

    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload
        } else {
          return quiz
        }
      })
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload)
    },
  },
})

export const { addQuiz, updateQuiz, setQuiz, setQuizzes, deleteQuiz } =
  quizzesSlice.actions
export default quizzesSlice.reducer
