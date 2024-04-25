import React, {useRef, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {KanbasState} from '../../store'
import * as client from './client'
import {setQuiz, updateQuiz} from './reducer.js'
import {time} from 'console'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {FaBan, FaCheckCircle} from 'react-icons/fa'

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

function QuizEdit() {
    const retQuiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)

    console.log('ret quiz u bastard', retQuiz)

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
        <div className={"d-flex flex-column me-5"}>
            <div className='editHeader' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div>
                    Points {retQuiz.points}
                </div>
                <div style={{marginLeft: '10px', display: 'flex', alignItems: 'center'}}>
                    <div>
                        {quiz.published ? <FaCheckCircle/> : <FaBan/>}
                    </div>
                    <div style={{marginLeft: '4px'}}>
                        {retQuiz.published ? 'Published' : 'Not Published'}
                    </div>
                </div>
            </div>
            <div>
                <nav className="nav nav-tabs mt-2">
                    <a className="nav-link active">
                        Details
                    </a>
                    <Link style={{color: 'red'}} className="nav-link" to={path + '/questions'}>
                        Questions
                    </Link>
                </nav>

                <input
                    type="text"
                    className="form-control mt-3 mb-3"
                    id="input1"
                    value={titleInputValue}
                    onChange={(e) => handleChange(e, setTitleInputValue)}
                />
                Quiz Instructions
                <ReactQuill
                    className={"mt-2"}
                    theme="snow"
                    value={quizInstructions}
                    onChange={setQuizInstructions}
                />
                <hr/>

                <div className={"d-flex align-items-center me-5 text-nowrap"}>
                    <label className={"me-5"}>Quiz Type</label>
                    <select className="form-select ms-3" value={quizType}
                            onChange={(e) => handleChange(e, setQuizType)}>
                        <option value="GRADED_QUIZ">Graded Quiz</option>
                        <option value="PRACTICE_QUIZ">Practice Quiz</option>
                        <option value="GRADED_SURVEY">Graded Survey</option>
                        <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </select>
                </div>
                <br/>

                <div className={"d-flex align-items-center me-5 text-nowrap"}>
                    <label className={"me-1"}>Assignment Group</label>
                    <select
                        className={"form-select"}
                        value={assignmentGroup}
                        onChange={(e) => handleChange(e, setAssignmentGroup)}
                    >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </select>
                </div>
                <hr/>

                <h5>Options:</h5>

                <div className={"d-flex align-items-center text-nowrap mt-3"}>
                    <label className={"me-4"}>Time Limit</label>
                    <input
                        className={"form-control ms-2"}
                        type="number"
                        value={timeLimit}
                        onChange={(e) => handleChange(e, setTimeLimit)}
                    />
                </div>

                <div className={"d-flex align-items-center me-5 text-nowrap mt-3"}>
                    <label className={"me-5"}>Points</label>
                    <input
                        className={"form-control ms-3"}
                        type="number"
                        value={points}
                        onChange={(e) => handleChange(e, setPoints)}
                    />
                </div>

                <div className={"d-flex align-items-center text-nowrap mt-3"}>
                    <label className={"me-3"}>Access Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="input1"
                        value={accessCode}
                        onChange={(e) => handleChange(e, setAccessCode)}
                    />
                </div>
                <hr/>

                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={multipleAttempts}
                        onChange={(e) => handleChangeCheckBox(e, setMultipleAttempts)}
                    />
                    <label className={"form-check-label"}>Multiple Attempts</label>
                </div>
                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={shuffleAnswers}
                        onChange={(e) => handleChangeCheckBox(e, setShuffleAnswers)}
                    />
                    <label className={"form-check-label"}>Shuffle Answers</label>
                </div>

                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={showCorrectAnswers}
                        onChange={(e) => handleChangeCheckBox(e, setShowCorrectAnswers)}
                    />
                    <label className={"form-check-label"}>Show Correct Answers</label>
                </div>

                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={oneQuestionAtATime}
                        onChange={(e) => handleChangeCheckBox(e, setOneQuestionAtATime)}
                    />
                    <label className={"form-check-label"}>One Question At A Time</label>
                </div>

                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={webCamRequired}
                        onChange={(e) => handleChangeCheckBox(e, setWebCamRequired)}
                    />
                    <label className={"form-check-label"}>Webcam Required</label>
                </div>

                <div className={"form-check"}>
                    <input
                        className={"form-check-input"}
                        type="checkbox"
                        checked={lockQuestion}
                        onChange={(e) => handleChangeCheckBox(e, setLockQuestion)}
                    />
                    <label className={"form-check-label"}>Lock Question</label>
                </div>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mt-3 ms-5 me-5 text-nowrap">
                    <div className={"d-flex align-items-center"}>
                        <label className={"me-1"}>Due Date</label>
                        <input
                            className={"form-control"}
                            type="date"
                            value={dueDate}
                            onChange={(e) => handleChange(e, setDueDate)}
                        />
                    </div>

                    <div className={"d-flex align-items-center"}>
                        <label className={"me-1"}>Available Date</label>
                        <input
                            className={"form-control"}
                            type="date"
                            value={availableDate}
                            onChange={(e) => handleChange(e, setAvailableDate)}
                        />
                    </div>

                    <div className={"d-flex align-items-center"}>
                        <label className={"me-1"}>Until Date</label>
                        <input
                            className={"form-control"}
                            type="date"
                            value={untilDate}
                            onChange={(e) => handleChange(e, setUntilDate)}
                        />
                    </div>
                </div>

                <hr/>
                <div className="d-flex justify-content-between align-items-center">
                    <div className={"ms-3"}>
                        <input type="checkbox"/> Notify users this quiz has changed
                    </div>
                    <div className={"me-3"}>
                        <button className="btn btn-outline-secondary me-1" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-outline-secondary me-1" onClick={handleUpdatePublish}>Save and
                            Publish
                        </button>
                        <button className="btn btn-danger" onClick={handleUpdateSave}>Save</button>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default QuizEdit
