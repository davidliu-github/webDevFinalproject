import React, { useState, useEffect } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { addModule, updateModule, setModule, setModules, deleteModule } from './reducer'
import { KanbasState } from '../../store'
import * as client from './client'

function ModuleList() {
  const { courseId } = useParams()
  const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules)
  const module = useSelector((state: KanbasState) => state.modulesReducer.module)
  const dispatch = useDispatch()
  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)))
  }, [courseId])
  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module))
    })
  }
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId))
    })
  }
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module)
    dispatch(updateModule(module))
  }

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
      <div className="box-container">
        <input
          className="addmodule-box"
          value={module.name}
          onChange={(e) =>
            dispatch(
              setModule({
                ...module,
                name: e.target.value,
              }),
            )
          }
        />
        <button className="btn btn-success ms-2" onClick={handleAddModule}>
          Add
        </button>
        <button className="btn btn-primary" onClick={handleUpdateModule}>
          Update
        </button>

        <br />
        <textarea
          className="addmodule-box"
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }
        />
      </div>

      <ul className="list-group wd-modules">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module2) => (
            <li
              className="list-group-item"
              onClick={(event) => {
                dispatch(setModule(module2))
              }}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module2.name}
                <span className="float-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => dispatch(setModule(module2))}
                  >
                    Edit
                  </button>

                  <FaCheckCircle className="ms-2 text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {module._id === module2._id && (
                <ul className="list-group">
                  {module2.lessons?.map((lesson: any) => (
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
