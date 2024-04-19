import React, { useState, useEffect } from 'react'
import './index.css'
import { modules } from '../../Database'
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaBan } from 'react-icons/fa'
import { useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { addQuiz, updateQuiz, setQuiz, deleteQuiz, setQuizzes } from './reducer.js'
import { KanbasState } from '../../store'
import * as client from './client'
import ListItem from './ListItem'
import { Link, useLocation } from "react-router-dom";
function QuizzesDetails() {

  const { quizId } = useParams()

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
  const handleUpdateTrue = async () => {
    const updatedQuiz = { ...quiz, published: true };
    console.log("id is", quiz._id)
    const status = await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const handleUpdateFalse = async () => {
    const updatedQuiz = { ...quiz, published: false };
    console.log("id is", quiz._id)
    const status = await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };
  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId))
    })
  }


  const pubColor = 'btn-' + (quiz.published ? 'success' : 'danger');
  const { pathname } = useLocation();
  const lastSlashIndex = pathname.lastIndexOf("/");
  const substringBeforeLastSlash = pathname.substring(0, lastSlashIndex);
  return (
    <div className="me-4">
      <div className="col-md-12 flex-fill mt-4">
        <div style={{ float: 'right' }}>
          <button
            className={`button btn ${pubColor}`}
            onClick={() => {quiz.published ? handleUpdateFalse() : handleUpdateTrue()}}>
              {quiz.published ? <FaCheckCircle /> : <FaBan/>}
              {quiz.published ? "Published" : 'Unpublish'}

          </button>
          <button
            className="button btn btn-secondary"
            onClick={() => handleAddQuiz()}>
            <Link to={substringBeforeLastSlash + "/preview"}>Preview</Link>
          </button>
          <button
            className="button btn btn-secondary">
            <Link to={substringBeforeLastSlash + "/edit"}>Edit</Link>
          </button>
          <button className="btn btn-secondary color-lightgray ">
            <FaEllipsisV className="color-black" />
          </button>
        </div>
        <br />
        <br />
        <hr />
      </div>
      <span className='fw-bold fs-3 text-uppercase'>Quiz - {quiz.title}</span>
      <br />
      <br />
      <div className="flex-container">
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Quiz Type</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.quizType}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Points</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.points}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Assignment Group</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.assignmentGroup}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Shuffle Answers</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.shuffleAnswers ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Time Limit</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.timeLimit} Minutes
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Multiple Attempts</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.multipleAttempts ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Show Correct Answers</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.showCorrectAnswers ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Access Code</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.accessCode}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>One Question at a Time</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Webcam Required</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.webcamRequired ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Lock Questions After Answering</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.lockQuestion ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Due date</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.dueDate}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Availiable date</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.availabilityDate}
            </div>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className='d-flex justify-content-end'>
              <span className='fw-bold'>Until date</span>
            </div>
          </div>
          <div className="col-6">
            <div className='d-flex justify-content-start'>
              {quiz.untilDate}
            </div>
          </div>
          <div className="col">
          </div>
        </div>


      </div>
      <br />
      <br />
      <br />
      <div className='container'>
        <div className="row">
          <div className="col-3">
            <div className='d-flex'>
              <span className='fw-bold'>Due</span>
            </div>
          </div>
          <div className="col-3">
            <div className='d-flex'>
            <span className='fw-bold'>For</span>
            </div>
          </div>
          <div className="col-3">
          <div className='d-flex'>
            <span className='fw-bold'>Availiable From</span>
            </div>
          </div>
          <div className="col-3">
          <div className='d-flex'>
            <span className='fw-bold'>Until</span>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col-3">
            <div className='d-flex'>
              {quiz.dueDate}
            </div>
          </div>
          <div className="col-3">
            <div className='d-flex'>
              Everyone
            </div>
          </div>
          <div className="col-3">
          <div className='d-flex'>
            {quiz.availableDate}
            </div>
          </div>
          <div className="col-3">
          <div className='d-flex'>
            {quiz.untilDate}
            </div>
          </div>
        </div>
        <hr></hr>
      </div>

    </div>
  )
}
export default QuizzesDetails