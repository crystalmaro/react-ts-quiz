// https://www.youtube.com/watch?v=F2JCjVSZlG0 
import React, { useState } from 'react';
import { fetchQuizQuestions } from './API'
// components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API'
// Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, loadingSet] = useState(false);
  const [questions, questionsSet] = useState<QuestionsState[]>([]);
  const [number, numberSet] = useState(0);
  const [userAnswers, userAnswersSet] = useState<AnswerObject[]>([]);
  const [score, scoreSet] = useState(0);
  const [gameOver, gameOverSet] = useState(true);

  const startTrivia = async () => {
    loadingSet(true);
    gameOverSet(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    questionsSet(newQuestions);
    scoreSet(0);
    userAnswersSet([]);
    numberSet(0);
    loadingSet(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;
      // check answer against correct anwer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) scoreSet(prev => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      userAnswersSet(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // move onto the next question, if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      gameOverSet(true);
    } else {
      numberSet(nextQuestion);
    }
  }

  return (
    <div className='App'>
      <GlobalStyle />
      <Wrapper>
      <h1>Random Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS
        ? <button className='start' onClick={startTrivia}>Start</button>
        : null  
      }
      {!gameOver ? <p className='score'>Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
        ) : null}
      </Wrapper>
    </div>
  )
}

export default App;


// import React, { useState } from 'react';
// import { fetchQuizQuestions } from './API';
// // Components
// import QuestionCard from './components/QuestionCard';
// // types
// import { QuestionsState, Difficulty } from './API';

// export type AnswerObject = {
//   question: string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// };

// const TOTAL_QUESTIONS = 10;

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<QuestionsState[]>([]);
//   const [number, setNumber] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);

//   const startTrivia = async () => {
//     setLoading(true);
//     setGameOver(false);
//     const newQuestions = await fetchQuizQuestions(
//       TOTAL_QUESTIONS,
//       Difficulty.EASY
//     );
//     setQuestions(newQuestions);
//     setScore(0);
//     setUserAnswers([]);
//     setNumber(0);
//     setLoading(false);
//   };

//   const checkAnswer = (e: any) => {
//     if (!gameOver) {
//       // User's answer
//       const answer = e.currentTarget.value;
//       // Check answer against correct answer
//       const correct = questions[number].correct_answer === answer;
//       // Add score if answer is correct
//       if (correct) setScore((prev) => prev + 1);
//       // Save the answer in the array for user answers
//       const answerObject = {
//         question: questions[number].question,
//         answer,
//         correct,
//         correctAnswer: questions[number].correct_answer,
//       };
//       setUserAnswers((prev) => [...prev, answerObject]);
//     }
//   };

//   const nextQuestion = () => {
//     // Move on to the next question if not the last question
//     const nextQ = number + 1;

//     if (nextQ === TOTAL_QUESTIONS) {
//       setGameOver(true);
//     } else {
//       setNumber(nextQ);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>REACT QUIZ</h1>
//         {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
//           <button className='start' onClick={startTrivia}>
//             Start
//           </button>
//         ) : null}
//         {!gameOver ? <p className='score'>Score: {score}</p> : null}
//         {loading ? <p>Loading Questions...</p> : null}
//         {!loading && !gameOver && (
//           <QuestionCard
//             questionNr={number + 1}
//             totalQuestions={TOTAL_QUESTIONS}
//             question={questions[number].question}
//             answers={questions[number].answers}
//             userAnswer={userAnswers ? userAnswers[number] : undefined}
//             callback={checkAnswer}
//           />
//         )}
//         {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
//           <button className='next' onClick={nextQuestion}>
//             Next Question
//           </button>
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default App;