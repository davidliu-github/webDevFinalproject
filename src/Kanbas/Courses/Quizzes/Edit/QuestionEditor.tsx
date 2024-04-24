import React, { useEffect, useState } from 'react'
import QuizDetails from '../QuizDetails'
import { Question } from './QuizQuestions'

function QuestionEditor({
  currQuestion,
  handleUpdateActiveQuestionId,
  questions,
  handleUpdateQuestion,
}: {
  currQuestion: Question
  handleUpdateActiveQuestionId: (id: string | undefined) => void
  questions: Question[]
  handleUpdateQuestion: (question: Question) => void
}) {
  const [question, setQuestion] = useState({
    _id: currQuestion._id,
    editing: currQuestion.editing,
    title: currQuestion.title,
    type: currQuestion.type,
    points: currQuestion.points,
    question: currQuestion.question,
    choices: currQuestion.choices,
    answer: currQuestion.answer,
  })

  //   const [questionType, setQuestionType] = useState(currQuestion.type)
  //   const [points, setPoints] = useState(currQuestion.points)
  //   const [question, setQuestion] = useState(currQuestion.question)
  //   const [trueFalseAnswer, setTrueFalseAnswer] = useState('False')
  const [answers, setAnswers] = useState(
    question.choices.map((choice: string) => ({
      value: choice,
      isCorrect: choice === currQuestion.answer,
    })),
  )

  const updateQuiz = async () => {
    handleUpdateQuestion(question)
    handleUpdateActiveQuestionId(undefined)
  }

  const getInstructionalText = () => {
    switch (question.type) {
      case 'multiple-choice':
        return 'Enter your question and multiple answers, then select the one correct answer.'
      case 'true-false':
        return 'Enter your question text, then select if True or False is the correct answer.'
      case 'fill-in-blank':
        return 'Enter your question text, then define all possible correct answers for the blank.\nStudents will see the question followed by a small text box to type their answer.'
      default:
        return ''
    }
  }

  const addAnswer = () => {
    setAnswers([...answers, { value: '', isCorrect: false }])
    setQuestion((prevState) => {
      return { ...prevState, choices: [...prevState.choices, ''] }
    })
  }

  const updateAnswer = (index: number, value: any) => {
    const updatedAnswers = answers.map((answer: any, idx: number) =>
      idx === index ? { ...answer, value: value } : answer,
    )
    setAnswers(updatedAnswers)
    setQuestion((prevState) => {
      return { ...prevState, choices: updatedAnswers.map((a: any) => a.value) }
    })
  }

  const setCorrect = (index: number) => {
    const updatedAnswers = answers.map((answer: any, idx: number) => ({
      ...answer,
      isCorrect: idx === index,
    }))
    setAnswers(updatedAnswers)
    setQuestion((prevState) => {
      return { ...prevState, answer: updatedAnswers[index].value }
    })
  }

  const removeAnswer = (index: number) => {
    setAnswers((prevState) => prevState.filter((_: any, idx: number) => idx !== index))
    setQuestion((prevState) => {
      return {
        ...prevState,
        choices: prevState.choices.filter((_: any, idx: number) => idx !== index),
      }
    })
  }

  return (
    <div
      className="multiple-choice-editor d-flex flex-column justify-content-start"
      style={{ border: '1px solid black', padding: '10px' }}
    >
      <div className="d-flex justify-content-between align-items-center w-100 mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            defaultValue="Question Title"
            style={{ marginRight: '10px' }}
            value={question.title}
            onChange={(e) =>
              setQuestion((prevState) => {
                return { ...prevState, title: e.target.value }
              })
            }
          />
          <select
            className="form-select"
            value={question.type}
            onChange={(e) =>
              setQuestion((prevState) => {
                return { ...prevState, type: e.target.value }
              })
            }
            style={{ width: 'auto' }}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-in-blank">Fill in the Blank</option>
          </select>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-2">pts:</span>
          <input
            type="number"
            className="form-control"
            style={{ width: '100px' }}
            value={question.points}
            onChange={(e) =>
              setQuestion((prevState) => {
                return { ...prevState, points: parseInt(e.target.value) }
              })
            }
            min="0"
          />
        </div>
      </div>

      <div className="instruction-text mb-3">
        <p>{getInstructionalText()}</p>
      </div>

      <h5>Question:</h5>

      <textarea
        className="form-control"
        value={question.question}
        onChange={(e) =>
          setQuestion((prevState) => {
            return { ...prevState, question: e.target.value }
          })
        } // Handle changes
        style={{ resize: 'vertical' }}
        rows={3}
      ></textarea>

      <h5 className={'mt-4'}>Answers:</h5>

      {question.type === 'true-false' && (
        <div className="mb-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="trueFalseAnswer"
              id="trueOption"
              value="True"
              checked={question.answer === 'True'}
              onChange={() =>
                setQuestion((prevState) => {
                  return { ...prevState, answer: 'True' }
                })
              }
            />
            <label className="form-check-label" htmlFor="trueOption">
              True
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="trueFalseAnswer"
              id="falseOption"
              value="False"
              checked={question.answer === 'False'}
              onChange={() =>
                setQuestion((prevState) => {
                  return { ...prevState, answer: 'False' }
                })
              }
            />
            <label className="form-check-label" htmlFor="falseOption">
              False
            </label>
          </div>
        </div>
      )}

      {question.type !== 'true-false' &&
        answers.map(
          (
            answer: {
              isCorrect: boolean | undefined
              value: string | number | readonly string[] | undefined
            },
            index: number,
          ) => (
            <div key={index} className="mb-3 d-flex align-items-center">
              <input
                type="radio"
                className="form-check-input me-2"
                checked={answer.isCorrect}
                onChange={() => setCorrect(index)}
              />
              <label className={answer.isCorrect ? 'me-3' : 'me-2'}>
                {answer.isCorrect ? 'Correct:' : 'Possible:'}
              </label>
              <input
                type="text"
                className="form-control"
                value={answer.value}
                onChange={(e) => updateAnswer(index, e.target.value)}
              />
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => removeAnswer(index)}
              >
                Delete
              </button>
            </div>
          ),
        )}

      {question.type === 'multiple-choice' && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-danger" onClick={addAnswer}>
            + Add Another Answer
          </button>
        </div>
      )}

      <div className="d-flex justify-content-start mt-3">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => handleUpdateActiveQuestionId(undefined)}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={updateQuiz}>
          Update Question
        </button>
      </div>
    </div>
  )
}

export default QuestionEditor
