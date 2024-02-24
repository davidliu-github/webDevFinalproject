import { courses } from '../../Kanbas/Database'
import { useParams, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { HiMiniBars3 } from 'react-icons/hi2'
import CourseNavigation from './Navigation'
import Modules from './Modules'
import Home from './Home'
import './index.css'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import { FaGlasses, FaBars, FaChevronDown } from 'react-icons/fa'
import Assignments from './Assignments'

function Courses() {
  const { courseId } = useParams()
  const course = courses.find((course) => course._id === courseId)
  const location = useLocation()
  const pathSegments = location.pathname
    .split('/')
    .slice(2)
    .filter((segment) => segment)

  const breadcrumbs = pathSegments.map((segment, index) => (
    <Typography key={index} className="color-red" variant="h5">
      {segment}
    </Typography>
  ))
  return (
    <div>
      <div className="col-md-12 d-block d-md-none">
        <div className="top-bar">
          <div>
            <a href="/Kanbas/Navigation/index.html">
              <FaBars className="color-white" />
            </a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to={'/'} className="color-white">
              CS4550.12631.202410
            </Link>
            <br />
            <Link to={'/'} className="color-white">
              Modules
            </Link>
          </div>
          <div>
            <a
              href="/Kanbas/Courses/Navigation/index.html"
              className="color-white"
              style={{ textDecoration: 'none' }}
            >
              <FaGlasses />
              <FaChevronDown />
            </a>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <HiMiniBars3 className="color-red size-25 ms-2" />
          {breadcrumbs}
        </Breadcrumbs>
        <button
          className="btn btn-secondary color-black me-3"
          style={{ marginLeft: 'auto', backgroundColor: 'lightgray' }}
        >
          <FaGlasses className="color-black" /> Student View
        </button>
      </div>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: '320px', top: '50px' }}
        >
          <br />
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />

            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h2>Assignment Editor</h2>}
            />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="People" element={<h2>People</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default Courses
