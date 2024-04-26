import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as client from '../client'
import {
  FaPencilAlt,
  FaCaretRight,
  FaExclamationCircle,
  FaCaretLeft,
} from 'react-icons/fa'

function QuizPreview() {
  const location = useLocation()
  const path = location.pathname
  console.log('@@@@@@ PATH: ', path)

  // Will need to find out the path to get the exact title for the preview
  const quizTitle = path.substring(
    path.indexOf('/Quizzes/') + 9,
    path.indexOf('/preview'),
  )
  console.log('@@@@@@ QUIZ TITLE: ', quizTitle)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const { courseId } = useParams()

  // will not set questions because of invalid quiztitle
  const findQuestions = async () => {
    const response = await client.getQuizByTitle(quizTitle)
    console.log('@@@@@@ RESPONSE: ', response)
    setQuestions(response.questions)
  }

  React.useEffect(() => {
    findQuestions()
  }, [currentQuestionIndex])

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
        {questions.map(
          (question, index) =>
            index === currentQuestionIndex && (
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
                  {question.type === 'multiple-choice' && (
                    <li className="list-group-item">
                      <span className="question-choices">
                        {question.choices.map((choice: string, index: number) => (
                          <span key={index}>
                            <input
                              type="radio"
                              name="choice"
                              value={choice}
                              className="me-2"
                            />
                            <label>{choice}</label>
                            <hr />
                          </span>
                        ))}
                      </span>{' '}
                    </li>
                  )}
                  {question.type === 'true-false' && (
                    <li className="list-group-item">
                      <span className="question-choices">
                        <input type="radio" name={`question-${index}`} value="true" />
                        <label>True</label>
                        <hr />
                        <input type="radio" name={`question-${index}`} value="false" />
                        <label>False</label>
                        <br />
                      </span>{' '}
                    </li>
                  )}
                  {question.type === 'fill-in-the-blank' && (
                    <li className="list-group-item">
                      <span className="question-choices">
                        <textarea
                          rows={4}
                          cols={50}
                          placeholder="Type your answer here"
                        ></textarea>
                      </span>{' '}
                    </li>
                  )}
                </ul>
                <br />
              </div>
            ),
        )}
      </div>
      <br />
      {currentQuestionIndex > 0 && (
        <button
          className="btn btn-light"
          style={{ float: 'left', border: '1px solid black' }}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
        >
          Previous
          <FaCaretLeft />
        </button>
      )}
      {currentQuestionIndex < questions.length - 1 && (
        <button
          className="btn btn-light"
          style={{ float: 'right', border: '1px solid black' }}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        >
          Next
          <FaCaretRight />
        </button>
      )}
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
      <Link
        to={path.substring(0, path.indexOf('/preview')) + '/edit/questions'}
        style={{ textDecoration: 'none' }}
      >
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
      </Link>
      <br />
      <h3> Questions </h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index} style={{ listStyleType: 'none' }}>
            <Link
              to={path}
              style={{ textDecoration: 'none' }}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {question.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizPreview
