import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quizzes: [{_id: "", quizType: "", points: 0, assignmentGroup: "", shuffleAnswers: "", timeLimit: 0, multipleAttempts: "", showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: "", webcamRequired: "", lockQuestion: "", dueDate: "", availableDate: "", untilDate: "", published: false, title: ""}],
  quiz: { quizType: "", points: 0, assignmentGroup: "", shuffleAnswers: "", timeLimit: 0, multipleAttempts: "", showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: "", webcamRequired: "", lockQuestion: "", dueDate: "", availableDate: "", untilDate: "", published: false, title: "" },
}

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload
    },

    addQuizzes: (state, action) => {
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
