import QuizOption from "../components/QuizOption"
import QuizQuestion from "../components/QuizQuestion"

const QuizCard = ({currentOptions, updatechoice, gameState}) => {
    
    const buildQuizOption = () => {
        // if (gameState==='setup' || gameState===null) {return}
        if (gameState==='victory') {
            return (
                <>
                <p>Congrats!</p>
                </>
            )
        } 
        if (gameState==='defeat'){
            return (
                <>
                <p>Wrong Answer!</p>
                </>
            )
        }
        return (
            <section className="options-container">
                <QuizOption qLetter={"A"} quote={currentOptions[0]} updatechoice={updatechoice} gameState={gameState}/>
                <QuizOption qLetter={"B"} quote={currentOptions[1]} updatechoice={updatechoice} gameState={gameState}/>
                <QuizOption qLetter={"C"} quote={currentOptions[2]} updatechoice={updatechoice} gameState={gameState}/>
                <QuizOption qLetter={"D"} quote={currentOptions[3]} updatechoice={updatechoice} gameState={gameState}/>
            </section>
        )
    }
    return (
        <>
        <h3>Guess which quote is from world famous Artist, Rapper, Entrepreneur and Social Commentator - Kanye West.</h3>
        <section className="image-container">
        </section>
        {buildQuizOption()}
        </>
    )
}

export default QuizCard