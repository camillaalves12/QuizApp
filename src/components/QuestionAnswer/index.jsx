import S from './styles.module.scss'




export function QuestionAnswer({
   question,
   answer,
   handleAnswerQuestion
}) {
   return(
      <button 
         className={S.container} 
         onClick={(event) => handleAnswerQuestion(event, question, answer)}
         >
            {answer}
      </button>
   )
}

//PROPS DE + 2 JEITOS 

// export function QuestionAnswer(props) {
//    // PODE SER ASSIM
//    // const {answer, handleAnswerQuestion} = props   
//    return(
//       <button 
//          className={S.container} 
//          onClick={(event) => props.handleAnswerQuestion(event, question,answer)}>
//             {props.answer}
//       </button>
//    )
// }
          


// export function QuestionAnswer(props) {
//    // const {answer, handleAnswerQuestion} = props   
//    return(
//       <button 
//          className={S.container} 
//          onClick={(event) => handleAnswerQuestion(event, question,answer)}>
//             {answer}
//       </button>
//    )
// }


