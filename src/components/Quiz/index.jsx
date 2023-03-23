import React, { useState } from "react"
import S from './styles.module.scss' 

import { QuestionAnswer } from "../QuestionAnswer"

const QUESTIONS = [
   {
      id: 1,
      question: 'Qual é o meu nome?',
      answers: ['Victoria', 'Eloiza', 'Camilla', 'Ana'],
      correctAnswer: 'Camilla'
   },
   {
      id: 2,
      question: 'Qual é a minha idade?',
      answers: ['12', '26', '21', '23'],
      correctAnswer: '21'
   },
   {
      id: 3,
      question: 'O que eu sou?',
      answers: ['Desenvolvedora', 'Médica', 'nutricionista', 'motorista'],
      correctAnswer: 'Desenvolvedora'
   }

]
export function Quiz() {

   const [currentQuestionIndex, setCurrentQuestionIndex ] = useState(0) // para pergunta
   const [isTakinQuiz, setIsTakinQuiz] = useState(true) // tafazendo o quiz??   
   const currentQuestion = QUESTIONS[currentQuestionIndex];     //aqui ele acessa todo o array
   


   const handleNextQuestion = () => {
      if ( currentQuestionIndex < QUESTIONS.length - 1) {
         setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
         setIsTakinQuiz(false)
      }
   }

   const handleAnswerQuestion = (event, question, userAnswer) => {
      const isCorrectAnswer = question.correctAnswer === userAnswer
      
      const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
      event.currentTarget.classList.toggle(resultClassName)
   }

   const quizSize = QUESTIONS.length
   const navigationButtonText = currentQuestionIndex + 1 === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'


// 01:19


   return(
      <div className={S.container}>
         <div className={S.card}>
            {/* aqui ta fazendo o operador ternario */}
            {isTakinQuiz ? (
               <div className={S.quiz}>

               <header>
                  <span>PERGUNTA 1/3</span>
                  <p>{currentQuestion.question}</p>
               </header>

               <ul className={S.answers}>
                  {currentQuestion.answers.map(answer => (
                     <li key={answer}>
                        <QuestionAnswer 
                           question={currentQuestion}
                           answer={answer}
                           handleAnswerQuestion={handleAnswerQuestion}
                        />
                     </li>
                  ))}
               </ul>

               <button className={S.navigationBtn} onClick={handleNextQuestion}>
                  {navigationButtonText}
               </button>
            </div>
               ) : (
                  <div>
                     <h1>Resultado</h1>
                  </div>
               )}
         </div>
      </div>
      )
   }