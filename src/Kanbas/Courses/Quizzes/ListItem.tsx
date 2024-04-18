import React, { FC } from 'react';
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaBan, FaRocket } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import { Link, useLocation } from "react-router-dom";

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
  setQuiz: () => {};
  deleteQuiz: () => void;

};

type Test = {
  bio: string;
}



const ListItem: React.FC<Quiz> = (props) => {
  const { pathname } = useLocation();
  const [showPopup, setShowPopup] = React.useState(false);
  const { availableDate, dueDate, points, questions, published, title } = props.quiz;
  return (
    <li className="list-group-item mt-2">
      {published ? <FaRocket className="ms-2  me-2 text-success" /> : <FaRocket className="ms-2  me-2 text-secendary" /> }
      <span className='text-uppercase fw-bold'><Link to={pathname + "/" + title + "/details"}>{title}</Link></span>
      <span className="float-end">
        {props.quiz.published ? <FaCheckCircle className="ms-2 text-success" /> : <FaBan className="ms-2 text-secendary" />}
        
        <Menu menuButton={<MenuButton style={{ "backgroundColor": 'white' }}><FaEllipsisV /></MenuButton>}>
          <div style={{ "backgroundColor": "white", "position": "fixed", "zIndex": 100 }}>
            <MenuItem style={{ "listStyleType": "none" }}><Link to={pathname + "/" + props.quiz.title + "/edit"}>Edit</Link></MenuItem>
            <MenuItem style={{ "listStyleType": "none" }} onClick={props.deleteQuiz}>Delete</MenuItem>
            <MenuItem style={{ "listStyleType": "none" }}>Publish</MenuItem>
          </div>
        </Menu>
      </span>
      <br/>
      <span className="ms-4 fw-bold">Not available until {availableDate}</span> 
      Due {dueDate} {points} pts questions 
    </li>
  );
};

export default ListItem;

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
