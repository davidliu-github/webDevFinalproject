import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../store'
import * as client from './client'
import { setQuiz, updateQuiz } from './reducer.js'
import { time } from 'console'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

function QuizEdit() {
  const navigation = useNavigate()

  const location = useLocation()

  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  const dispatch = useDispatch()

  const [titleInputValue, setTitleInputValue] = useState(location.state.quiz.title)
  const [quizType, setQuizType] = useState(location.state.quiz.quizType)
  const [points, setPoints] = useState(location.state.quiz.points)
  const [assignmentGroup, setAssignmentGroup] = useState(
    location.state.quiz.assignmentGroup,
  )
  const [shuffleAnswers, setShuffleAnswers] = useState(
    location.state.quiz.shuffleAnswers,
  )
  const [timeLimit, setTimeLimit] = useState(location.state.quiz.timeLimit)
  const [multipleAttempts, setMultipleAttempts] = useState(
    location.state.quiz.multipleAttempts,
  )
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(
    location.state.quiz.showCorrectAnswers,
  )
  const [accessCode, setAccessCode] = useState(location.state.quiz.accessCode)
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(
    location.state.quiz.oneQuestionAtATime,
  )
  const [webCamRequired, setWebCamRequired] = useState(
    location.state.quiz.webCamRequired,
  )
  const [lockQuestion, setLockQuestion] = useState(location.state.quiz.lockQuestion)
  const [dueDate, setDueDate] = useState(location.state.quiz.dueDate)
  const [availableDate, setAvailableDate] = useState(location.state.quiz.availableDate)
  const [untilDate, setUntilDate] = useState(location.state.quiz.untilDate)
  const [published, setPublished] = useState(location.state.quiz.published)
  const [quizInstructions, setQuizInstructions] = useState(
    location.state.quiz.quizInstructions,
  )

  const handleUpdatePublish = async () => {
    const updatedQuiz = {
      ...location.state.quiz,
      _id: location.state.quiz._id,
      quizType: quizType,
      points: points,
      assignmentGroup: assignmentGroup,
      shuffleAnswers: shuffleAnswers,
      timeLimit: timeLimit,
      multipleAttempts: multipleAttempts,
      showCorrectAnswers: showCorrectAnswers,
      accessCode: accessCode,
      oneQuestionAtATime: oneQuestionAtATime,
      webCamRequired: webCamRequired,
      lockQuestion: lockQuestion,
      dueDate: dueDate,
      availableDate: availableDate,
      untilDate: untilDate,
      published: true,
      title: titleInputValue,
      questions: location.state.quiz.questions,
      quizInstructions: quizInstructions,
    }
    const status = await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    navigation(-1)
  }

  const handleUpdateSave = async () => {
    const updatedQuiz = {
      ...location.state.quiz,
      _id: location.state.quiz._id,
      quizType: quizType,
      points: points,
      assignmentGroup: assignmentGroup,
      shuffleAnswers: shuffleAnswers,
      timeLimit: timeLimit,
      multipleAttempts: multipleAttempts,
      showCorrectAnswers: showCorrectAnswers,
      accessCode: accessCode,
      oneQuestionAtATime: oneQuestionAtATime,
      webCamRequired: webCamRequired,
      lockQuestion: lockQuestion,
      dueDate: dueDate,
      availableDate: availableDate,
      untilDate: untilDate,
      published: location.state.quiz.published,
      title: titleInputValue,
      questions: location.state.quiz.questions,
      quizInstructions: quizInstructions,
    }
    const status = await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    navigation(-1)
  }

  const handleChange = (
    e: InputEvent,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(e.target.value)
  }

  const handleChangeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setValue(e.target.checked)
  }

  const handleCancel = () => {
    navigation(-1)
  }

  return (
    <div>
      Quiz Instructions
      <ReactQuill
        theme="snow"
        value={quizInstructions}
        onChange={setQuizInstructions}
      />
      {console.log(quizInstructions)}
      Points {location.state.quiz.points}
      {console.log(location.state.quiz.points)}
      {location.state.published ? 'Published' : 'Not Published'}
      <nav className="nav nav-tabs mt-2">
        <Link className="nav-link active" to="/Quizzes/blank/edit">
          Details
        </Link>
        <Link style={{ color: 'red' }} className="nav-link" to="/Labs/a3">
          Questions
        </Link>
      </nav>
      <label htmlFor="input1" className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="input1"
        value={titleInputValue}
        onChange={(e) => handleChange(e, setTitleInputValue)}
      />
      <label>Quiz Type</label>
      <select value={quizType} onChange={(e) => handleChange(e, setQuizType)}>
        <option value="GRADED_QUIZ">Graded Quiz</option>
        <option value="PRACTICE_QUIZ">Practice Quiz</option>
        <option value="GRADED_SURVEY">Graded Survey</option>
        <option value="UNGRADED_SURVEY">Ungraded Survey</option>
      </select>
      <label>Points</label>
      <input
        type="number"
        value={points}
        onChange={(e) => handleChange(e, setPoints)}
      />
      <label>Assignment Group</label>
      <select
        value={assignmentGroup}
        onChange={(e) => handleChange(e, setAssignmentGroup)}
      >
        <option value="Quizzes">Quizzes</option>
        <option value="Exams">Exams</option>
        <option value="Assignments">Assignments</option>
        <option value="Project">Project</option>
      </select>
      <label>Shuffle Answers</label>
      <input
        type="checkbox"
        checked={shuffleAnswers}
        onChange={(e) => handleChangeCheckBox(e, setShuffleAnswers)}
      />
      <label>Time Limit</label>
      <input
        type="number"
        value={timeLimit}
        onChange={(e) => handleChange(e, setTimeLimit)}
      />
      <label>Multiple Attempts</label>
      <input
        type="checkbox"
        checked={multipleAttempts}
        onChange={(e) => handleChangeCheckBox(e, setMultipleAttempts)}
      />
      <label>Show Correct Answers</label>
      <input
        type="checkbox"
        checked={showCorrectAnswers}
        onChange={(e) => handleChangeCheckBox(e, setShowCorrectAnswers)}
      />
      <label>Access Code</label>
      <input
        type="text"
        className="form-control"
        id="input1"
        value={accessCode}
        onChange={(e) => handleChange(e, setAccessCode)}
      />
      <label>One Question At A Time</label>
      <input
        type="checkbox"
        checked={oneQuestionAtATime}
        onChange={(e) => handleChangeCheckBox(e, setOneQuestionAtATime)}
      />
      <label>Webcam Required</label>
      <input
        type="checkbox"
        checked={webCamRequired}
        onChange={(e) => handleChangeCheckBox(e, setWebCamRequired)}
      />
      <label>Lock Question</label>
      <input
        type="checkbox"
        checked={lockQuestion}
        onChange={(e) => handleChangeCheckBox(e, setLockQuestion)}
      />
      <label>Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => handleChange(e, setDueDate)}
      />
      <label>Available Date</label>
      <input
        type="date"
        value={availableDate}
        onChange={(e) => handleChange(e, setAvailableDate)}
      />
      <label>Until Date</label>
      <input
        type="date"
        value={untilDate}
        onChange={(e) => handleChange(e, setUntilDate)}
      />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleUpdatePublish}>Save and Publish</button>
      <button onClick={handleUpdateSave}>Save</button>
    </div>
  )
}

export default QuizEdit
