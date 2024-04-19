import React, { FC } from 'react';
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaBan, FaRocket } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { Link, useLocation, useNavigate } from "react-router-dom";

type QuizTemplate = {
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  showCorrectAnswers: Boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestion: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  title: string;
  questions: Number;
};

type Quiz = {
  quiz: QuizTemplate;
  setQuiz: () => void;
  deleteQuiz: () => void;

};

type Test = {
  bio: string;
}



const ListItem: React.FC<Quiz> = (props) => {
  const { pathname } = useLocation();

  const currentDate = new Date();
  const availableDate1 = new Date(props.quiz.availableDate);
  const untilDate1 = new Date(props.quiz.untilDate);
  let availabilityStatus = '';
  let availabilityDate = '';
  if (currentDate < availableDate1) {
    availabilityStatus = `Not available until`;
    availabilityDate = availableDate1.toDateString();
  } else if (currentDate > untilDate1) {
    availabilityStatus = 'Closed';
  } else if (currentDate >= availableDate1 && currentDate <= untilDate1) {
    availabilityStatus = 'Available';
  }

  const [showPopup, setShowPopup] = React.useState(false);
  const { availableDate, untilDate, dueDate, points, questions, published, title } = props.quiz;
  const questions1 = questions.toString();

  return (
    <li className="list-group-item mt-2">
      {published ? <FaRocket className="ms-2  me-2 text-success" /> : <FaRocket className="ms-2  me-2 text-secendary" /> }
      <span className='text-uppercase fw-bold' ><Link to={pathname + "/" + title + "/details"} onClick={() => props.setQuiz()}>{title}</Link></span>
      <span className="float-end">
        {props.quiz.published ? <FaCheckCircle className="ms-2 text-success" /> : <FaBan className="ms-2 text-secendary" />}
        
        <Menu menuButton={<MenuButton style={{ "backgroundColor": 'white' }}><FaEllipsisV /></MenuButton>}>
          <div style={{ "backgroundColor": "white", "position": "fixed", "zIndex": 100 }}>
            <MenuItem style={{ "listStyleType": "none" }} onClick={()=>{navigate(pathname + '/' + props.quiz.title + '/edit', {state:{quiz: props.quiz}})}}>Edit</MenuItem>
            <MenuItem style={{ "listStyleType": "none" }} onClick={props.deleteQuiz}>Delete</MenuItem>
            <MenuItem style={{ "listStyleType": "none" }}>Publish</MenuItem>
          </div>
        </Menu>
      </span>
      <br/>
      <span className="ms-4 fw-bold"> { availabilityStatus + "  "} </span> {availabilityDate + "  "}
      <b>Due</b> {dueDate +"  "} {points + "  "} pts Questions {questions1}
    </li>
  );
};

export default ListItem;

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
