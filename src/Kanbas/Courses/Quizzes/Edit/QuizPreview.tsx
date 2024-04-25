import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as client from '../client'
import { FaPencilAlt, FaCaretRight, FaExclamationCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { KanbasState } from '../../../store'

function QuizPreview() {
  const location = useLocation()
  const path = location.pathname
  console.log('@@@@@@ PATH: ', path)
  const retQuiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  console.log('@@@@@ QUIZ: ', retQuiz)
  // Will need to find out the path to get the exact title for the preview
  const quizTitle = retQuiz.title;
  
  console.log('@@@@@@ QUIZ TITLE: ', quizTitle)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const { courseId } = useParams()

  // will not set questions because of invalid quiztitle
  const findQuestions = async () => {
    const response = await client.getQuiz(retQuiz._id)
    console.log('@@@@@@ RESPONSE: ', response)
    setQuestions(response.questions)
  }

  React.useEffect(() => {
    findQuestions()
  }, [])

  const date = new Date(Date.now()).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return (
    <div style={{ marginRight: '100px' }}>
      <h2>{quizTitle}</h2>
      <div
        style={{
          backgroundColor: '#FFDAD3',
          color: '#C41F00',
          padding: '4',
          borderRadius: '5px',
        }}
      >
        <FaExclamationCircle className="me-1" />
        This is a preview of the published version of the quiz.
      </div>
      <br />
      <div>Started: {date}</div>
      <h2>
        <b>Quiz Instructions</b>
      </h2>
      <hr />

      <div className="question-list">
        {questions.map((question) => (
          <div>
            <ul className="list-group" style={{ border: '1px solid black' }}>
              <li
                className="list-group-item"
                style={{
                  backgroundColor: 'lightgray',
                  borderBottom: '1px solid black',
                }}
              >
                <h4 className="question-title">
                  <span>{question.title}</span>
                  <span className="question-points" style={{ float: 'right' }}>
                    {question.points} pts
                  </span>
                </h4>
              </li>

              <li className="list-group-item">
                <span className="question-text">Question: {question.question}</span>{' '}
                <br />
              </li>

              <li className="list-group-item">
                <span className="question-choices">
                  {question.choices.map((choice: string, index: number) => (
                    <span key={index}>
                      {choice} <hr />
                    </span>
                  ))}
                </span>{' '}
              </li>
            </ul>
            <br />
          </div>
        ))}
      </div>
      <br />
      <button
        className="btn btn-light"
        style={{ float: 'right', border: '1px solid black' }}
      >
        Next
        <FaCaretRight />
      </button>
      <br />
      <br />
      <div
        className="p-2"
        style={{
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div>
          Quiz saved at {date}
          <button className="btn btn-light ms-2" style={{ border: '1px solid black' }}>
            Submit Quiz
          </button>
        </div>
      </div>
      <br />
      <button
        className="btn btn-light"
        style={{
          border: '1px solid black',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <FaPencilAlt className="me-2" style={{ transform: 'scaleX(-1)' }} />
        Keep Editing This Quiz
      </button>
      <br />
      <h3> Questions </h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index} style={{ listStyleType: 'none' }}>
            <Link to={question.title} style={{ textDecoration: 'none' }}>
              {question.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizPreview
