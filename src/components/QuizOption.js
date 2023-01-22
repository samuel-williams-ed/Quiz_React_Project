

const QuizOption = ({qNumber, quote}) => {
    return (
        <div className="questionBox">
            <h3>{qNumber}: {quote}</h3>
        </div>
    )
}

export default QuizOption