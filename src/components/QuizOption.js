

const QuizOption = ({qLetter, quote, updatechoice, gameState}) => {
    return (
        <>
        { gameState==='setup' && <button onClick={updatechoice} value={qLetter} className="questionBox">{qLetter}:</button>}
        { gameState==='playing' && <button onClick={updatechoice} value={qLetter} className="questionBox">{qLetter}: {quote}</button>}
        </>
    )
}

export default QuizOption