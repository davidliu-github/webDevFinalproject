import React, { FC } from 'react'
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaBan,
  FaRocket,
} from 'react-icons/fa'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as client from './client'
import { useDispatch } from 'react-redux'
import {updateQuiz} from './reducer'
type QuizTemplate = {
  quizType: string
  points: number
  assignmentGroup: string
  shuffleAnswers: boolean
  timeLimit: number
  multipleAttempts: boolean
  showCorrectAnswers: Boolean
  accessCode: string
  oneQuestionAtATime: boolean
  webcamRequired: boolean
  lockQuestion: boolean
  dueDate: Date
  availableDate: Date
  untilDate: Date
  published: boolean
  title: string
  questions: Array<any>
}

type Quiz = {
  quiz: QuizTemplate
  setQuiz: () => void
  deleteQuiz: () => void
}

type Test = {
  bio: string
}

const ListItem: React.FC<Quiz> = (props) => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const handlePublish = async () => {
    const status = await client.updateQuiz({...props.quiz, published: true})
    dispatch(updateQuiz({...props.quiz, published: true}))
  }

  const currentDate = new Date()
  console.log('@@@ Current Date: ', currentDate)

  const availableDate1 = new Date(props.quiz.availableDate)
  console.log('@@@ availableDate1: ', availableDate1)
  console.log('@@@ status date', currentDate < availableDate1)
  const untilDate1 = new Date(props.quiz.untilDate)
  let availabilityStatus = ''
  let availabilityDate = ''
  if (currentDate < availableDate1) {
    availabilityStatus = `Not available until`
    availabilityDate = availableDate1.toDateString()
  } else if (currentDate > availableDate1) {
    availabilityStatus = 'Closed'
  } else if (currentDate >= availableDate1 && currentDate <= untilDate1) {
    availabilityStatus = 'Available'
  }
  function formatDate(x: Date): string {
    // Extract year, month, and day from the Date object
    const date = new Date(x);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: month is zero-based
    const day = (date.getDate() + 1).toString().padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const [showPopup, setShowPopup] = React.useState(false)
  const { availableDate, untilDate, dueDate, points, questions, published, title } =
    props.quiz
  const lenQuestions = questions.length > 0 ? questions.length - 1 : 0 
  const navigate = useNavigate()

  return (
    <li className="list-group-item mt-2">
      {published ? (
        <FaRocket className="ms-2  me-2 text-success" />
      ) : (
        <FaRocket className="ms-2  me-2 text-secendary" />
      )}
      <span className="text-uppercase fw-bold">
        <Link to={pathname + '/' + title + '/details'} onClick={() => props.setQuiz()}>
          {title}
        </Link>
      </span>
      <span className="float-end">
        {props.quiz.published ? (
          <FaCheckCircle className="ms-2 text-success" />
        ) : (
          <FaBan className="ms-2 text-secendary" />
        )}

        <Menu
          menuButton={
            <MenuButton style={{ backgroundColor: 'white' }}>
              <FaEllipsisV />
            </MenuButton>
          }
        >
          <div style={{ backgroundColor: 'white', position: 'fixed', zIndex: 100 }}>
            <MenuItem
              style={{ listStyleType: 'none' }}
              onClick={() => {
                navigate(pathname + '/' + props.quiz.title + '/edit', {
                  state: { quiz: props.quiz },
                });
                (props.setQuiz())
              }}
            >
              Edit
            </MenuItem>
            <MenuItem style={{ listStyleType: 'none' }} onClick={props.deleteQuiz}>
              Delete
            </MenuItem>
            <MenuItem style={{ listStyleType: 'none' }} onClick={()=>handlePublish()}>Publish</MenuItem>
          </div>
        </Menu>
      </span>
      <br />
      <span className="ms-4 fw-bold"> {availabilityStatus + '  '} </span>{' '}
      {availabilityDate + '  '}
      <b>Due</b> {formatDate(dueDate) + '  '} {points + '  '} pts {lenQuestions + '  '} Questions 
    </li>
  )
}

export default ListItem

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.')
}
