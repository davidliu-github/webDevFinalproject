import KanbasNavigation from './Navigation'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Courses from './Courses'
import './styles.css'
import { useState, useEffect } from 'react'
import store from './store'
import { Provider } from 'react-redux'
import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE
function Kanbas() {
  const [courses, setCourses] = useState<any[]>([])
  const COURSES_API = `${API_BASE}/api/courses`
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API)
    setCourses(response.data)
  }
  useEffect(() => {
    findAllCourses()
  }, [])

  const [course, setCourse] = useState({
    _id: '1234',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    image: '../../images/english.png',
  })
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course)
    setCourses([...courses, response.data])
  }
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}`)
    setCourses(courses.filter((course) => course._id !== courseId))
  }
  const updateCourse = async () => {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course)

    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course
        } else {
          return c
        }
      }),
    )
  }
////////////////////////////////////////

const [quizzes, setQuizzes] = useState<any[]>([])
const QUIZZES_API = `${API_BASE}/api/quizzes`
const findAllQuizzes = async () => {
  const response = await axios.get(QUIZZES_API)
  setQuizzes(response.data)
}
useEffect(() => {
  findAllQuizzes()
}, [])

const [quiz, setQuiz] = useState({
  _id: '1234',
  title: 'New Quiz',
  quizType: 'New Number',
  points: 0,
  assignmentGroup: "Exams",
  shuffleAnswers: true,
  timeLimit: 20,
  multipleAttempts: false,
  showCorrectAnswers: false,
  accessCode: "1234",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestion: false,
  dueDate: "2023-09-10",
  availableDate: "2023-09-11",
  untilDate: "2023-09-12",
  published: false,
})
const addNewQuiz = async () => {
  const response = await axios.post(QUIZZES_API, quiz)
  setQuizzes([...quizzes, response.data])
}
const updateQuiz = async () => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz)

  setQuizzes(
    courses.map((q) => {
      if (q._id === quiz._id) {
        console.log('success!')
        return course
      } else {
        console.log('fail womp womp')
        return q
      }
    }),
  )
}
  return (
    <Provider store={store}>
      <div className="d-flex">
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default Kanbas
