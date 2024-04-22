import React, {useEffect, useState} from 'react'

function MultipleChoiceEdit() {
    const [questionType, setQuestionType] = useState('Multiple Choice');
    const [points, setPoints] = useState('1');
    const [question, setQuestion] = useState('');
    const [trueFalseAnswer, setTrueFalseAnswer] = useState('True');
    const [answers, setAnswers] = useState([{value: '', isCorrect: true}]);


    useEffect(() => {
        setQuestion(getDefaultQuestion());
    }, [questionType]);

    const getInstructionalText = () => {
        switch (questionType) {
            case 'Multiple Choice':
                return "Enter your question and multiple answers, then select the one correct answer.";
            case 'True/False':
                return "Enter your question text, then select if True or False is the correct answer.";
            case 'Fill in the Blank':
                return "Enter your question text, then define all possible correct answers for the blank.\nStudents will see the question followed by a small text box to type their answer.";
            default:
                return "";
        }
    };

    const getDefaultQuestion = () => {
        switch (questionType) {
            case 'Multiple Choice':
                return "How much is 2 + 2?";
            case 'True/False':
                return "2 + 2 = 4";
            case 'Fill in the Blank':
                return "2 + 2 = ______";
            default:
                return "";
        }
    };

    const addAnswer = () => {
        setAnswers([...answers, {value: '', isCorrect: false}]);
    };

    const updateAnswer = (index: number, value: any) => {
        const updatedAnswers = answers.map((answer, idx) => idx === index ? {...answer, value: value} : answer);
        setAnswers(updatedAnswers);
    };

    const setCorrect = (index: number) => {
        const updatedAnswers = answers.map((answer, idx) => ({
            ...answer,
            isCorrect: idx === index
        }));
        setAnswers(updatedAnswers);
    };

    const removeAnswer = (index: number) => {
        setAnswers(answers.filter((_, idx) => idx !== index));
    };

    return (
        <div
            className="multiple-choice-editor d-flex flex-column justify-content-start"
            style={{border: '1px solid black', padding: '10px'}}
        >
            <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        defaultValue="Question Title"
                        style={{marginRight: '10px'}}
                    />
                    <select
                        className="form-select"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        style={{width: 'auto'}}
                    >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Fill in the Blank">Fill in the Blank</option>
                    </select>
                </div>

                <div className="d-flex align-items-center">
                    <span className="me-2">pts:</span>
                    <input
                        type="number"
                        className="form-control"
                        style={{width: "100px"}}
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
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
                value={question}
                onChange={(e) => setQuestion(e.target.value)}  // Handle changes
                style={{resize: 'vertical'}}
                rows={3}
            ></textarea>

            <h5 className={"mt-4"}>Answers:</h5>

            {questionType === 'True/False' && (
                <div className="mb-3">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="trueFalseAnswer"
                            id="trueOption"
                            value="True"
                            checked={trueFalseAnswer === 'True'}
                            onChange={() => setTrueFalseAnswer('True')}
                        />
                        <label className="form-check-label" htmlFor="trueOption">True</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="trueFalseAnswer"
                            id="falseOption"
                            value="False"
                            checked={trueFalseAnswer === 'False'}
                            onChange={() => setTrueFalseAnswer('False')}
                        />
                        <label className="form-check-label" htmlFor="falseOption">False</label>
                    </div>
                </div>
            )}

            {questionType !== 'True/False' && answers.map((answer, index) => (
                <div key={index} className="mb-3 d-flex align-items-center">
                    <input
                        type="radio"
                        className="form-check-input me-2"
                        checked={answer.isCorrect}
                        onChange={() => setCorrect(index)}
                    />
                    <label className={answer.isCorrect ? "me-3" : "me-2"}>
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
            ))}

            {questionType === 'Multiple Choice' && (
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-danger" onClick={addAnswer}>+ Add Another Answer</button>
                </div>
            )}

            <div className="d-flex justify-content-start mt-3">
                <button className="btn btn-outline-secondary me-2">Cancel</button>
                <button className="btn btn-danger">Update Question</button>
            </div>
        </div>
    );
}

export default MultipleChoiceEdit;
