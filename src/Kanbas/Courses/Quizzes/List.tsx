import React, { useState, useEffect } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { addQuiz, updateQuiz, setQuiz, deleteQuiz, setQuizzes } from './reducer'
import { KanbasState } from '../../store'
import * as client from './client'

function QuizzesList() {
  const { quizTitle } = useParams()
  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  const dispatch = useDispatch()
  useEffect(() => {
    client
      .getQuizzes()
      .then((quizzes) => dispatch(setQuizzes(quizzes)))
  }, [quizTitle])
  const handleAddQuiz = () => {
    client.createQuiz(quizTitle, module).then((module) => {
      dispatch(addQuiz(module))
    })
  }
  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz)
    dispatch(updateQuiz(module))
  }
 
  const handleDeleteModule = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId))
    })
  }
  return (
    <div className="me-4">
      <div className="col-md-12 flex-fill mt-4">
        <div style={{ float: 'right' }}>
          <button className="btn btn-secondary module-button">+ Quiz</button>

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
          placeholder='Search for Quiz'
        />
        
        <br />
      </div>

      <ul className="list-group wd-modules">

        {quizList.map((quiz) => (
            <li
              className="list-group-item"
              onClick={(event) => {
                dispatch(setQuiz(quiz))
              }}
            >

              <div>
                <FaEllipsisV className="me-2" />
                Assignment Quizzes
                <span className="float-end">
                  <button
                    className="btn btn-success"
                    onClick={() => dispatch(setQuiz(quiz))}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteModule(quiz._id)}
                  >
                    Delete
                  </button>
                  <FaCheckCircle className="ms-2 text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
                <ul className="list-group">
                    <li className="list-group-item">
                      <FaEllipsisV className="me-2" />
                      {quiz.title}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
              
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default QuizzesList
