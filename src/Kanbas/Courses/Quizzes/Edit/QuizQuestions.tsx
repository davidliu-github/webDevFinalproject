import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as client from '../client'
import QuestionEditor from './QuestionEditor'

export interface Question {
  _id?: string
  type: string
  editing: boolean
  title: string
  points: number
  question: string
  choices: string[]
  answer: string
}

interface QuizState {
  quizId: string
  questions: Question[]
  activeQuestionId: string | undefined
}

function QuizQuestions() {
  const location = useLocation()
  const path = location.pathname
  const previewPath = path.substring(path.indexOf('Kanbas/'), path.indexOf('/Quizzes'))
  // console.log('@@@@@@ PREVIEW PATH: ', previewPath)

  const quizTitle = path.substring(
    path.indexOf('Quizzes/') + 8,
    path.indexOf('/edit/questions'),
  )

  const [quizState, setQuizState] = useState<QuizState>({
    quizId: 'Dummy id',
    questions: [],
    // The current question id that is being edited (only one question can be edited at a time)
    // - undefined indicates no question is currently being edited
    activeQuestionId: undefined,
  })

  const findQuestions = async () => {
    const response = await client.getQuizByTitle(quizTitle)
    setQuizState((prevState) => ({
      ...prevState,
      questions: response.questions,
      quizId: response._id,
    }))
  }

  const defaultQuestion: Question = {
    type: 'multiple-choice',
    editing: false,
    title: `multiple choice ${quizState.questions.length + 1}`,
    points: 1,
    question: 'How much is 2 + 2?',
    choices: ['4'],
    answer: '4',
  }

  const handleUpdateActiveQuestionId = (id: string | undefined) => {
    setQuizState((prevState) => ({
      ...prevState,
      activeQuestionId: id,
    }))
  }

  const handleDeleteQuestion = async (id: string | undefined) => {
    if (!id) return
    setQuizState((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((question) => question._id !== id),
    }))
  }

  // todo remove client call but create a new one that we can select?
  const handleNewQuestion = async () => {
    try {
      const response = await client.createQuestion(quizState.quizId, defaultQuestion)
      if (response && response.questionId) {
        const newQuestion = { ...defaultQuestion, _id: response.questionId }
        console.log(newQuestion)
        setQuizState((prevState) => ({
          ...prevState,
          questions: [...prevState.questions, newQuestion],
          activeQuestionId: response.questionId,
        }))
      }
    } catch (err) {
      console.log(`Error creating question: ${err}`)
    }
  }

  // should be only call to update DB
  const saveQuizQuestionsToDB = async () => {
    try {
      const response = await client.updateQuizQuestions(
        quizState.quizId,
        quizState.questions,
      )
      console.log('Updated quiz:', response)
    } catch (err: any) {
      console.log(`Error updating quiz: ${err}`)
    }
  }

  const handleUpdateQuestion = (question: Question) => {
    setQuizState((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((q) =>
        q._id === question._id ? question : q,
      ),
    }))
  }

  React.useEffect(() => {
    findQuestions()
  }, [])

  return (
    <>
      <span className="quiz-questions-details">
        Points 10 (X) Not Published -Elipses-
      </span>
      <hr />
      <nav className="nav nav-tabs mt-2">
        <Link style={{ color: 'red' }} className="nav-link" to="/Quizzes/blank/edit">
          Details
        </Link>
        <Link className="nav-link active" to={path}>
          Questions
        </Link>
        {/* Temporary Until Details page is set up */}
        <Link
          className="nav-link"
          to={`/${previewPath}/Quizzes/${quizTitle}/QuizPreview`}
        >
          Question Preview
        </Link>
      </nav>
      <div className="question-list">
        {quizState.questions.map((question, index) =>
          question._id === quizState.activeQuestionId ? (
            <QuestionEditor
              currQuestion={question}
              handleUpdateActiveQuestionId={handleUpdateActiveQuestionId}
              questions={quizState.questions}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          ) : (
            <div key={index} className="question" style={{ border: '1px solid black' }}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="ms-2 mt-2">Question</h3>
                <div>
                  <button
                    className="btn btn-warning me-2 mt-2"
                    onClick={() => handleUpdateActiveQuestionId(question._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-2 mt-2"
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="question-title">Title: {question.title}</span> <br />
              <span className="question-text">Question: {question.question}</span>{' '}
              <br />
              <span className="question-type">Type: {question.type}</span> <br />
              <span className="question-points">Points: {question.points}</span> <br />
              <span className="question-choices">
                Choices: {question.choices.toString()}
              </span>{' '}
              <br />
              <span className="question-answer">Answer: {question.answer}</span>
            </div>
          ),
        )}
        {/* EDITTING COMPONENTS FOR TESTING, NEED TO REMOVE TODO
        <MultipleChoiceEdit currQuestion={defaultQuestion} />
        */}
      </div>
      <span className="quiz-question-buttons">
        <button className="btn btn-outline-secondary" onClick={handleNewQuestion}>
          New Question
        </button>
        <button className="btn btn-outline-secondary">New Question Group</button>
        <button className="btn btn-outline-secondary">Find Questions</button>
      </span>
      <hr />
      <span className="question-question-finish-buttons">
        <input type="checkbox" /> Notify users this quiz has changed
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.location.reload()}
        >
          Cancel
        </button>
        <button className="btn btn-outline-secondary" onClick={saveQuizQuestionsToDB}>
          Save & Publish
        </button>
        <button className="btn btn-danger" onClick={saveQuizQuestionsToDB}>
          Save
        </button>
      </span>
      <hr />
    </>
  )
}

export default QuizQuestions
