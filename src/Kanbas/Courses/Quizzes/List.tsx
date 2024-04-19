import React, { useState, useEffect } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { addQuiz, updateQuiz, setQuiz, deleteQuiz, setQuizzes } from './reducer.js'
import { KanbasState } from '../../store'
import * as client from './client'
import ListItem from './ListItem'
function QuizzesList() {
  const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes)
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  const dispatch = useDispatch()
  useEffect(() => {
    client
      .getQuizzes()
      .then((quizzes) => dispatch(setQuizzes(quizzes)))
  }, [])
  const handleAddQuiz = () => {
    client.createQuiz(quiz).then((quiz) => {
      dispatch(addQuiz(quiz))
    })
  }
  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz)
    dispatch(updateQuiz(quiz))
  }

  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId))
    })
  }

  return (
    <div className="me-4">
      <div className="col-md-12 flex-fill mt-4">
        <div style={{ float: 'right' }}>
          <button
            className="btn btn-secondary module-button"
            onClick={() => handleAddQuiz()}>
            + Quiz
          </button>

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
        <li
          className="list-group-item"

        >

          <div>
            <FaEllipsisV className="me-2" />
            Assignment Quizzes


            {quizList.map((quiz) => (
              <>
                <ListItem quiz={quiz} setQuiz={() => dispatch(setQuiz(quiz))} deleteQuiz={() => handleDeleteQuiz(quiz._id)} />
              </>
            ))}
          </div>
        </li>
      </ul>
    </div>
  )
}
export default QuizzesList
