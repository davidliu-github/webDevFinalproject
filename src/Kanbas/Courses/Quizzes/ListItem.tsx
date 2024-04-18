import React, { FC } from 'react';
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from 'react-icons/fa';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';


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
  };

  type Quiz = {
    quiz: QuizTemplate;
    setQuiz: ()=>{};
    deleteQuiz: ()=>void;

  };

type Test = {
    bio:string;
}

const ListItem: React.FC<Quiz> = (props) => {
    const [showPopup,setShowPopup] = React.useState(false);
  return (
    <li className="list-group-item mt-2">
                  <FaEllipsisV className="me-2" />
                  {props.quiz.title}
                  <span className="float-end">

                    <button
                      className="btn btn-success"
                      onClick={props.setQuiz}
                    >
                      Edit
                    </button>
                    <FaCheckCircle className="ms-2 text-success" />
                    <FaPlusCircle className="ms-2" />
                    <Menu menuButton={<MenuButton style={{"backgroundColor":'white'}}><FaEllipsisV/></MenuButton>}>
                        <div style={{"backgroundColor":"white", "position":"fixed", "zIndex":100}}>
                        <MenuItem style={{"listStyleType": "none"}}>Edit</MenuItem>
      <MenuItem style={{"listStyleType": "none"}} onClick={props.deleteQuiz}>Delete</MenuItem>
      <MenuItem style={{"listStyleType": "none"}}>Publish</MenuItem>
                        </div>
    </Menu>
                  </span>
                </li>
  );
};

export default ListItem;

function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.');
}
