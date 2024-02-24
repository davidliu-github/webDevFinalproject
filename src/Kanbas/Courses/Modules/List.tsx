import React, { useState } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

function ModuleList() {
  const { courseId } = useParams()
  const modulesList = modules.filter((module) => module.course === courseId)
  const [selectedModule, setSelectedModule] = useState(modulesList[0])
  return (
    <div className="me-4">
      <div className="col-md-12 flex-fill mt-4">
        <div style={{ float: 'right' }}>
          <button className="btn btn-light color-lightgray">Collapse All</button>
          <button className="btn btn-light color-lightgray">View Progress</button>
          <select className="btn btn-light color-lightgray">
            <option>Publish All</option>
          </select>
          <button className="btn btn-secondary module-button">+ Module</button>

          <button className="btn btn-secondary color-lightgray ">
            <FaEllipsisV className="color-black" />
          </button>
        </div>
        <br />
        <br />
        <hr />
      </div>
      <ul className="list-group wd-modules">
        {modulesList.map((module) => (
          <li className="list-group-item" onClick={() => setSelectedModule(module)}>
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ModuleList
