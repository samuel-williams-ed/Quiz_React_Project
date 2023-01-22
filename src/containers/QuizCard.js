import QuizOption from "../components/QuizOption"
import QuizQuestion from "../components/QuizQuestion"

const QuizCard = ({currentOptions}) => {
    return (
        <>
        <h3>Guess which is quote from world famous Artist, Rapper and Social Commentator Kanye West:</h3>
        <section className="image-container">
        </section>
        <section className="options-container">
            <QuizOption qNumber={1} quote={currentOptions[0]}/>
            <QuizOption qNumber={2} quote={currentOptions[1]}/>
            <QuizOption qNumber={3} quote={currentOptions[2]}/>
            <QuizOption qNumber={4} quote={currentOptions[3]}/>
        </section>
        </>
    )
}

export default QuizCard