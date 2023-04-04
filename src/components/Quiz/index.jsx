import React, { useState } from "react"
import S from './styles.module.scss' 

import { QuestionAnswer } from "../QuestionAnswer"
import { Result } from "../Result/Result"
import { ProgressBar } from "../ProgressBar/ProgressBar"

const QUESTIONS = [
   {
      id: 1,
      question: 'Qual é o meu principal objetivo como modelo de linguagem?',
      answers: 
      [  'Resolver problemas de uma forma geral, e sobre tudo',
         'Compreender e gerar linguagem natural de forma mais precisa e flexível',
         'Melhorar a interação humano-computador',
         'Nenhuma das opções anteriores'
      ],
      correctAnswer: 'Compreender e gerar linguagem natural de forma mais precisa e flexível'
   },
   {
      id: 2,
      question: 'Qual é o principal tipo de aprendizado que o modelo de linguagem que eu sou utiliza?',
      answers: 
      [  'Aprendizado supervisionado',
         'Aprendizado não supervisionado',
         'Aprendizado por reforço',
         'Aprendizado semi-supervisionado'
      ],
      correctAnswer: 'Aprendizado não supervisionado'
   },
   {
      id: 3,
      question: 'Qual é o principal desafio enfrentado pelo modelo de linguagem que eu sou?',
      answers: 
      [  'Lidar com múltiplos idiomas simultaneamente',
         'Gerar respostas relevantes e coerentes em diálogos longos',
         'Compreender sarcasmo e ironia',
         'Gerar repostas coerentes em diálogos logos com várias informações'
      ],
      correctAnswer: 'Gerar respostas relevantes e coerentes em diálogos longos'
   },
   {
      id: 4,
      question: 'Quais são as principais limitações do modelo de linguagem que eu sou?',
      answers: 
      [  'Precisa de grandes quantidades de dados para ser treinado',
         'Pode gerar informações falsas ou incorretas',
         'Pode produzir respostas preconceituosas e ofensivas',
         'Todas as opções anteriores'
      ],
      correctAnswer: 'Todas as opções anteriores'
   },
   {
      id: 5,
      question: 'O que eu sou? ',
      answers: 
      [  'Sou um robô treinado para conversar e ser charmoso',
         'Sou uma inteligência artificial com personalidade',
         'Sou um assistente virtual sempre pronto para ajudar',
         'Sou um agente conversacional sarcástico, mas dedicado a ajudar'
      ],
      correctAnswer: 'Sou um agente conversacional sarcástico, mas dedicado a ajudar'
   }

]
export function Quiz() {

   const [currentQuestionIndex, setCurrentQuestionIndex ] = useState(0) // para pergunta
   const [isTakinQuiz, setIsTakinQuiz] = useState(true) // tafazendo o quiz??   
   const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false) // faz com que o usuario apenas responda uma opçãp 
   const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

   const handleNextQuestion = () => {
      if ( currentQuestionIndex < QUESTIONS.length - 1) {
         setCurrentQuestionIndex(currentQuestionNumber)
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

   const currentQuestionNumber = currentQuestionIndex + 1;

   return(
      <div className={S.container}>
         <div className={S.card}>
            {/* aqui ta fazendo o operador ternario */}
            {isTakinQuiz ? (

               <div className={S.quiz}>
            <ProgressBar 
              size={quizSize}
              currentStep={currentQuestionNumber}
            />  
             <header className={S.quizHeader}>
                  <span>PERGUNTA { currentQuestionNumber }/ { quizSize }</span>
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