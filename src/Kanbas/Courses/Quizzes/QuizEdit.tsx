import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { KanbasState } from '../../store'
import * as client from './client'
import { setQuiz, updateQuiz } from './reducer.js'
import { time } from 'console'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FaBan, FaCheckCircle } from 'react-icons/fa'

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

function QuizEdit() {
  const retQuiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)

  console.log('ret quiz u bastard',retQuiz)

  const location = useLocation()

  const navigation = useNavigate()

  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  const dispatch = useDispatch()

  const [titleInputValue, setTitleInputValue] = useState(retQuiz.title)
  const [quizType, setQuizType] = useState(retQuiz.quizType)
  const [points, setPoints] = useState(retQuiz.points)
  const [assignmentGroup, setAssignmentGroup] = useState(
    retQuiz.assignmentGroup,
  )
  const [shuffleAnswers, setShuffleAnswers] = useState(
    retQuiz.shuffleAnswers,
  )
  const [timeLimit, setTimeLimit] = useState(retQuiz.timeLimit)
  const [multipleAttempts, setMultipleAttempts] = useState(
    retQuiz.multipleAttempts,
  )
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(
    retQuiz.showCorrectAnswers,
  )
  const [accessCode, setAccessCode] = useState(retQuiz.accessCode)
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(
    retQuiz.oneQuestionAtATime,
  )
  const [webCamRequired, setWebCamRequired] = useState(
    retQuiz.webCamRequired,
  )
  const [lockQuestion, setLockQuestion] = useState(retQuiz.lockQuestion)
  const [dueDate, setDueDate] = useState(retQuiz.dueDate)
  const [availableDate, setAvailableDate] = useState(retQuiz.availableDate)
  const [untilDate, setUntilDate] = useState(retQuiz.untilDate)
  const [published, setPublished] = useState(retQuiz.published)
  const [quizInstructions, setQuizInstructions] = useState(
    retQuiz.quizInstructions,
  )

  const handleUpdatePublish = async () => {
    const updatedQuiz = {
      ...retQuiz,
      _id: retQuiz._id,
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
      questions: retQuiz.questions,
      quizInstructions: quizInstructions,
    }
    const status = await client.updateQuiz(updatedQuiz)
    dispatch(updateQuiz(updatedQuiz))
    navigation(-1)
  }

  const handleUpdateSave = async () => {
    const updatedQuiz = {
      ...retQuiz,
      _id: retQuiz._id,
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
      published: retQuiz.published,
      title: titleInputValue,
      questions: retQuiz.questions,
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
  const path = location.pathname
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <div className='editHeader' style={{display:'flex', justifyContent:'flex-end'}}>
      <div>
      Points {retQuiz.points}
      </div>
      <div style={{marginLeft:'10px', display:'flex', alignItems:'center' }}>
      <div>
      {quiz.published ? <FaCheckCircle/> : <FaBan /> }
      </div>
      <div  style={{marginLeft:'4px'}}>
      {retQuiz.published ? 'Published' : 'Not Published'}
      </div>
      </div>
      </div>
      <div>
      <nav className="nav nav-tabs mt-2">
        <a className="nav-link active">
          Details
        </a>
        <Link style={{ color: 'red' }} className="nav-link" to={path + '/questions'}>
          Questions
        </Link>
      </nav>

      <input
        type="text"
        className="form-control"
        id="input1"
        value={titleInputValue}
        onChange={(e) => handleChange(e, setTitleInputValue)}
      />
        Quiz Instructions
        <ReactQuill
        theme="snow"
        value={quizInstructions}
        onChange={setQuizInstructions}
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
        type="number" value={points}
        onChange={(e: any) => handleChange(e, setPoints)}
      </select>
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
      <label>Time Limit</label>
      <input
        type="number"
        value={timeLimit}
        onChange={(e) => handleChange(e, setTimeLimit)}
      />
      <label>Multiple Attempts</label>
      <input
        type="number"
        value={timeLimit}
        onChange={(e: any) => handleChange(e, setTimeLimit)}
      />
      <label>Multiple Attempts</label>
      <input
        type="checkbox"
        checked={multipleAttempts}
        onChange={(e) => handleChangeCheckBox(e, setMultipleAttempts)}
      />
      <label>Show Correct Answers</label>
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
      <label>Webcam Required</label>
      <input
        type="checkbox"
        checked={webCamRequired}
        onChange={(e) => handleChangeCheckBox(e, setWebCamRequired)}
      />
      <label>Lock Question</label>
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
    </div>
  )
}

export default QuizEdit
