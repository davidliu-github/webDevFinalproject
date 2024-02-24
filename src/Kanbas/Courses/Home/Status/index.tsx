import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  FaBan,
  FaCheckCircle,
  FaSignInAlt,
  FaArrowRight,
  FaBullseye,
  FaBullhorn,
  FaBell,
  FaChartBar,
  FaExclamationCircle,
  FaCalendar,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function StatusPage() {
  return (
    <div className="me-2">
      <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ width: '250px' }}>
        <h3>Course Status</h3>
        <ul className="list-group">
          <div className="btn-group-vertical">
            <div className="btn-group">
              <button className="btn btn-outline-secondary">
                <FaBan /> Unpublish
              </button>
              <button className="btn btn-outline-secondary wd-bg-lightgreen">
                <FaCheckCircle style={{ color: 'white' }} />
                Published
              </button>
            </div>
            <button className="btn btn-outline-secondary align-left">
              <FaSignInAlt /> Import Existing Content
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaArrowRight /> Import from Commons
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaBullseye /> Choose Home Page
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaChartBar /> View Course Stream
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaBullhorn /> New Announcement
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaChartBar /> New Analytics
            </button>
            <button className="btn btn-outline-secondary align-left">
              <FaBell />
              View Course Notifications
            </button>
          </div>
        </ul>
        <br />
        <h5>
          <b>TO DO</b>
        </h5>
        <hr />

        <Link to="/" style={{ color: 'red' }}>
          <FaExclamationCircle /> Grade A1 - ENV + HTML
        </Link>
        <p style={{ fontSize: '12px', marginLeft: '20px', color: 'red' }}>
          100 points * Sep 8 at 11:59pm
        </p>
        <br />

        <h5>
          <b>Coming Up</b>
          <Link
            to="/"
            style={{
              fontSize: '14px',
              marginLeft: '20px',
              color: 'red',
              float: 'right',
            }}
          >
            <FaCalendar /> view calendar
          </Link>
        </h5>
        <hr />

        <FaCalendar />
        <Link to="/" style={{ color: 'red' }}>
          Lecture
        </Link>
        <br />
        <p className="ms-4" style={{ fontSize: 12 }}>
          CS4550.12631.202410
          <br />
          Sep 8 at 11:59pm
          <br />
        </p>
        <FaCalendar />
        <Link to="/" style={{ color: 'red' }}>
          Lecture 4550 Web Dev
        </Link>
        <br />
        <p className="ms-4" style={{ fontSize: '12px' }}>
          CS4550.12631.202410
          <br />
          Sep 8 at 11:59pm
          <br />
        </p>
      </div>
    </div>
  )
}

export default StatusPage
