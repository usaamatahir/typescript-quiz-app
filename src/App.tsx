import React, { useEffect, useState } from 'react';
import  './App.css';
import { QuizDetails } from './API/QuizData';
import { DIFFICULTY, Question } from './Types/quizTypes';
import {QuestionCard, InputCard, Footer} from './QuizComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from './firebase'


function App() {

  const messaging = firebase.messaging();
  messaging.requestPermission().then((permission) => {
    return messaging.getToken();
  }).then((token) => {
    console.log("Token => ", token)
  })
  

  let [quiz, setQuiz] = useState<Question[]>([]);
  let [totalQuestion, setTotalQuestion] = useState<number>(5);
  let [category, setCategory] = useState<number>(9);
  let [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.EASY);
  let [submited, setSubmited] = useState<boolean>(false);
  let [score, setScore] = useState(0);
  let [step, setStep] = useState(0);
  let [showResult, setShowResult] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      const data: Question[] = await QuizDetails(totalQuestion, category, difficulty);
      setQuiz(data)
    }
    fetchData();
  }, [totalQuestion, category, difficulty]);

  const handelSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: Question = quiz[step];

    if (userAns === currentQuestion.answer) {
      setScore(++score);
    }

    if (step !== quiz.length - 1) {
      setStep(++step);
    }
    else {
      setShowResult(true);
    }
  };
  
  const handleInputSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setSubmited(true);
  }

  const tryAgain = () => {
    window.location.reload();
  }

  if (!quiz.length) {
    return (
      <div className='loader'>
    <CircularProgress />
  </div>
    )
  }

  if (showResult) {
    return (
      <div className='app' >
        <div className='heading'>
          <h1>Online Quiz Application</h1>
          <hr />
        </div>
        <div className='result'>
          <h1>Result</h1>
          <div className='score'>
            <h2>Total :</h2>
            <h2>{quiz.length}</h2>
          </div>
          <div className='score'>
            <h2>Your Score :</h2>
            <h2>{score}</h2>
          </div>
          <div className='score'>
            <h2>Percentage :</h2>
            <h2>{(score/quiz.length)*100 }</h2>
          </div>
          <input className="submit-btn" value="Try Again" type='submit' onClick={tryAgain} />
        </div>
      </div>
    );
  }

  if (!navigator.onLine) {
    return (
      <div className='app' >
      <div className='heading'>
        <h1>Online Quiz Application</h1>
        <hr />
        <h1 className='offline'>Please Make Sure Your internet Connection is working to start quiz.</h1>
      </div>
    </div>
    )
  }

  return (
    <div className='app' >
      <div className='heading'>
        <h1>Online Quiz Application</h1>
        <hr />
      </div>
      <div className='card' >
      {submited ? 
        <QuestionCard
        question = {quiz[step].question}
        answer = {quiz[step].answer}
        option = {quiz[step].option}
        totalQuestion= {quiz.length}
        currentQuestion = {step}
        callback = {handelSubmit}
        /> 
          :
        <InputCard 
        category = {category}
        setCategory = {setCategory}
        totalQuestion = {totalQuestion}
        setTotalQuestion = {setTotalQuestion}
        difficulty = {difficulty}
        setDifficulty = {setDifficulty}
        callback = {handleInputSubmit}
      />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
