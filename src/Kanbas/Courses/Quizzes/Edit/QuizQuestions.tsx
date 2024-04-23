import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as client from '../client'
import MultipleChoiceEdit from './MultipleChoiceEdit'

function renderSwitch(question: any) {
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoiceEdit currQuestion={question} />
    case 'true-false':
      return <></>
    case 'fill-in-blank':
      return <></>
    default:
      return <></>
  }
}

function QuizQuestions() {
  const location = useLocation()
  const path = location.pathname
  const previewPath = path.substring(path.indexOf('Kanbas/'), path.indexOf('/Quizzes'))
  console.log('@@@@@@ PREVIEW PATH: ', previewPath)

  const quizTitle = path.substring(
    path.indexOf('Quizzes/') + 8,
    path.indexOf('/edit/questions'),
  )
  const [quizId, setQuizId] = useState('Dummy id')
  const [questions, setQuestions] = useState<any[]>([])
  const findQuestions = async () => {
    const response = await client.getQuizByTitle(quizTitle)
    setQuestions(response.questions)
    setQuizId(response._id)
  }
  const defaultQuestion = {
    _id: '',
    type: 'multiple-choice',
    editing: true,
    title: `multiple choice ${questions.length + 1}`,
    points: 1,
    question: 'How much is 2 + 2?',
    choices: ['4'],
    answer: '4',
  }
  React.useEffect(() => {
    findQuestions()
  }, [])

  const handleNewQuestion = async () => {
    try {
      const status = await client.createQuestion(quizId, defaultQuestion)
      if (status.modifiedCount === 1) {
        setQuestions((prev) => [...prev, defaultQuestion])
      }
    } catch (err) {
      console.log(`Error creating question: ${err}`)
    }
  }

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
        {questions.map((question, index) =>
          question.editing ? (
            renderSwitch(question)
          ) : (
            <div key={index} className="question" style={{ border: '1px solid black' }}>
              <h3> Question </h3>
              <span className="question-title">Title: {question.title}</span> <br />
              <span className="question-text">Question: {question.question}</span>{' '}
              <br />
              <span className="question-type">Type: {question.type}</span> <br />
              <span className="question-points">Points: {question.points}</span> <br />
              <span className="question-choices">Choices: {question.choices}</span>{' '}
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
        <button className="btn btn-outline-secondary">Cancel</button>
        <button className="btn btn-outline-secondary">Save & Publish</button>
        <button className="btn btn-danger">Save</button>
      </span>
      <hr />
    </>
  )
}

export default QuizQuestions
