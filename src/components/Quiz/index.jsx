import React, { useState } from "react"
import S from './styles.module.scss' 

import { QuestionAnswer } from "../QuestionAnswer"
import { Result } from "../Result/Result"
import { ProgressBar } from "../ProgressBar/ProgressBar"

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
   const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false) // faz com que o usuario apenas responda uma opçãp 
   const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

   const handleNextQuestion = () => {
      if ( currentQuestionIndex < QUESTIONS.length - 1) {
         setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
         setIsTakinQuiz(false)
      }

      setIsCurrentQuestionAnswered(false)

   }

   const handleAnswerQuestion = (event, question, userAnswer) => {
      if (isCurrentQuestionAnswered) {
         return 
      } 

      const isCorrectAnswer = question.correctAnswer === userAnswer

      
      const resultClassName = isCorrectAnswer ? S.correct : S.incorrect

      event.currentTarget.classList.toggle(resultClassName)

      if (isCorrectAnswer) {
         setCorrectAnswersCount(correctAnswersCount + 1 )
      }

      setIsCurrentQuestionAnswered(true)
   }

   const handleTryAgain = () => {
      setIsTakinQuiz(true)
      setCurrentQuestionIndex(0)
      setCorrectAnswersCount(0)
   }

   const quizSize = QUESTIONS.length
   const currentQuestion = QUESTIONS[currentQuestionIndex];     //aqui ele acessa todo o array
   const navigationButtonText = currentQuestionIndex + 1 === quizSize ? 'Ver Resultado' : 'Próxima Pergunta'

   return(
      <div className={S.container}>
         <div className={S.card}>
            {/* aqui ta fazendo o operador ternario */}
            {isTakinQuiz ? (

               <div className={S.quiz}>
            <ProgressBar 
              size={quizSize}
              currentStep={currentQuestionIndex}
            />  
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
                     <Result correctAnswersCount={correctAnswersCount}
                     quizSize={quizSize}
                     handleTryAgain={handleTryAgain} 
                     />
      )}
      </div>
   </div>
   )
}