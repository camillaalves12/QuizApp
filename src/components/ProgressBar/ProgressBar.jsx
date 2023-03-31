import S from './styles.module.scss' 

export function ProgressBar({ size, currentStep}) {
   return(
      <div className={S.container}>
         <div className={S.steps} style={{gridTemplateColumns: `repeat(${size}, 1fr)`}}>
            {Array.from({ length: size }, (_, index) => index + 1 ).map(step => {
               <div key= {step} className={S.step} /> 
            })}
         </div>
      </div>
   )
}