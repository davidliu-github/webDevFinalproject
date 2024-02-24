import React from 'react'
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaFileSignature,
} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { assignments } from '../../Database'
import './index.css'
function Assignments() {
  const { courseId } = useParams()
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId,
  )
  return (
    <div className="me-2">
      <div>
        <div style={{ float: 'left' }}>
          <input type="text" placeholder="Search For Assignments"></input>
        </div>
        <div style={{ float: 'right' }}>
          <button className="btn btn-light color-lightgray">+ Group</button>
          <button className="btn btn-secondary module-button">+ Assignment</button>
          <button className="btn btn-secondary color-lightgray ">
            <FaEllipsisV className="color-black" />
          </button>
        </div>
        <br />
        <br />
        <hr />
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              40% of Total
              <FaCheckCircle className="text-success ms-2" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <FaEllipsisV className="me-2" />
                      <FaFileSignature className="me-1 color-green" />
                    </div>
                    <div>
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                      >
                        {assignment.title}
                      </Link>
                      <p style={{ fontSize: '12px' }}>
                        Multiple Modules | Due February 18 at 11:59pm | 100pts
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
export default Assignments
