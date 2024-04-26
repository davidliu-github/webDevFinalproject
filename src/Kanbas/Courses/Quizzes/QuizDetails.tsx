import React, { useState, useEffect } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { addQuiz, updateQuiz, setQuiz, deleteQuiz, setQuizzes } from './reducer.js'
import { KanbasState } from '../../store'
import * as client from './client'
import ListItem from './ListItem'
import { Link, useLocation } from 'react-router-dom'
function QuizzesDetails() {
  const retQuiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)

  const [quiz, setQuiz] = useState(retQuiz)

  console.log('quizzes details reran', quiz)
  const dispatch = useDispatch()

  const handleUpdateTrue = async () => {
    const updatedQuiz = { ...quiz, published: true }
    const status = await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    setQuiz(updatedQuiz)
  }

  const handleUpdateFalse = async () => {
    const updatedQuiz = { ...quiz, published: false }
    const status = await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    setQuiz(updatedQuiz)
  }

  function formatDate(x: Date): string {
    // Extract year, month, and day from the Date object
    const date = new Date(x)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Note: month is zero-based
    const day = (date.getDate() + 1).toString().padStart(2, '0')

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  const { pathname } = useLocation()
  const lastSlashIndex = pathname.lastIndexOf('/')
  const substringBeforeLastSlash = pathname.substring(0, lastSlashIndex)
  return (
    <div className="me-4">
      <div className="col-md-12 flex-fill mt-4">
        <div style={{ float: 'right' }}>
          <button
            className={`button btn ` + 'btn-' + (quiz.published ? 'danger' : 'success')}
            onClick={() => {
              quiz.published ? handleUpdateFalse() : handleUpdateTrue()
            }}
          >
            {quiz.published ? <FaBan /> : <FaCheckCircle />}
            {quiz.published ? 'Unpublish' : 'Publish'}
          </button>
          <Link to={substringBeforeLastSlash + '/preview'}>
            <button
              className="button btn btn-secondary"
              // onClick={() => props.setQuiz()}
            >
              Preview
            </button>
          </Link>
          <Link to={substringBeforeLastSlash + '/edit'}>
            <button className="button btn btn-secondary">Edit</button>
          </Link>
        </div>
        <br />
        <br />
        <hr />
      </div>
      <span className="fw-bold fs-3 text-uppercase">Quiz - {quiz.title}</span>
      <br />
      <br />
      <div className="flex-container">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Quiz Type</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.quizType}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Points</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.points}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Assignment Group</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.assignmentGroup}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Shuffle Answers</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.shuffleAnswers ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Time Limit</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.timeLimit} Minutes</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Multiple Attempts</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.multipleAttempts ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Show Correct Answers</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.showCorrectAnswers ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Access Code</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.accessCode}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">One Question at a Time</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Webcam Required</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.webcamRequired ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Lock Questions After Answering</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {quiz.lockQuestion ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Due date</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {formatDate(quiz.dueDate)}
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Availiable date</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">{quiz.availabilityDate}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end">
              <span className="fw-bold">Until date</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              {formatDate(quiz.untilDate)}
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="d-flex">
              <span className="fw-bold">Due</span>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="fw-bold">For</span>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="fw-bold">Availiable From</span>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="fw-bold">Until</span>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-3">
            <div className="d-flex">{formatDate(quiz.dueDate)}</div>
          </div>
          <div className="col-3">
            <div className="d-flex">Everyone</div>
          </div>
          <div className="col-3">
            <div className="d-flex">{formatDate(quiz.availableDate)}</div>
          </div>
          <div className="col-3">
            <div className="d-flex">{formatDate(quiz.untilDate)}</div>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  )
}
export default QuizzesDetails
