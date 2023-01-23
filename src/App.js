import { useState, useEffect } from 'react';
import './App.css';
import QuizCard from './containers/QuizCard';
import reduceString from './reduceString'

function App() {

// useStates
const [gameState, setGameState] = useState(null) //setup, playing, victory, defeat
const [answerIndex, setAnswerIndex] = useState(0) //should never be > 3
const [guessIndex, setGuessIndex] = useState(null) //should never be > 3
const [score, setScore] = useState(0)

const [optionOne, setOptionOne] = useState(["Answer A"])
const [optionTwo, setOptionTwo] = useState(["Answer B"])
const [optionThree, setOptionThree] = useState(["Answer C"])
const [kanyeQuote, setKanyeQuote] = useState("Answer D")
const [options, setOptions] = useState([])

// settings:
const mapAnswerToIndex = {"A":0, "B":1, "C":2, "D":3}
const quoteLength = 97

// manage React executions
useEffect( () => {
  // progressTheGame()
  // setOptions()
},[])

// useEffect(() => {
//   buildOptionsArray()
// }, [answerIndex])

useEffect(() => {
  buildOptionsArray()
}, [answerIndex, optionOne, optionTwo, optionThree, kanyeQuote])

// fetch quotes from API
const getKanyeChat = () => {
  fetch('https://api.kanye.rest/')
  .then( res => res.json())
  .then( quote => { 
    console.log("We have retrieved Kanye's wisdom")
    console.log(quote.quote)
    const option = reduceString(String(quote.quote), quoteLength)
    setKanyeQuote(option)
  })
  .catch("We have a problem accessing Kanye")
  }
const getQuoteOne = () => {
  fetch('https://api.goprogram.ai/inspiration')
  .then(res => res.json())
  .then(quote => {
    const option = reduceString(String(quote.quote), quoteLength)
    setOptionOne(option)
    console.log(`set Option 1 to: ${option}`)
    })
  }
const getQuoteTwo = () => {
  fetch('https://api.themotivate365.com/stoic-quote')
  .then(res => res.json())
  .then(quote => {
    const option = reduceString(String(quote.quote), quoteLength)
    setOptionTwo(option)
      console.log(`set Option 2 to: ${option}`)
    })
  }
const getQuoteThree = () => {
    fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.json())
    .then(quote => {
      const option = reduceString(String(quote), quoteLength)
      setOptionThree(option)
        console.log(`set Option 3 to: ${option}`)
      })
  }

    // loading functions
  const generateAnswerIndex = () => {
    let answer = Math.floor(Math.random() * 4);
    console.log(`Generated new correct answer to be ${answer}`)
    setAnswerIndex(answer) //should never be > 3
    
  }
  
  const buildOptionsArray = () => {
    console.log(`~~~ Building options array...`)
    let result = [optionOne, optionTwo, optionThree]
    result.splice(answerIndex, 0, kanyeQuote)
    console.log(`answerIndex = :${answerIndex}`)
    console.log(`inserting Kanye quote to position ${answerIndex}`)
    console.log(result)
    setOptions(result)
  }

  // initialise data; make API calls
const loadGame = () => {
  console.log("Loading Game...")

  generateAnswerIndex()
  console.log(`answerIndex set to: ${answerIndex}`)

  getQuoteOne()
  getQuoteTwo()
  getQuoteThree()
  getKanyeChat()
  buildOptionsArray()
}

const progressTheGame = (evt) => {
  console.log("Progressing the game")

  if (evt && gameState==='setup') {
    setGameState('playing')
    return
  } else if (gameState==='playing'){
    if (guessIndex === answerIndex){
      console.log("Correct!")
      setGameState('victory')
      setScore(score+1)
    } else {
      console.log("wrong choice")
      setGameState('defeat')
    }
  } else if (gameState==='victory' || gameState==='defeat') {
    loadGame()
    setGameState('playing')
  }
}

// initiate game
if (gameState===null){
  loadGame()
  setGameState('setup')
}

// change guess on answer selection
const updatechoice = (event) => {
  if (gameState==='playing'){
    event.target.classList.toggle('red-border')

    const chosenLetter = event.target.value
    console.log(`User has chosen ${chosenLetter}`)
    setGuessIndex(mapAnswerToIndex[chosenLetter])
  }
}
const renderButton = () => {
  if (gameState==='setup' || gameState===null) {
    return (<button onClick={(evt) => progressTheGame(evt)} className="bold cover">Start</button>)
  }
  else if (gameState==='playing') {
    return (<button onClick={(evt) => progressTheGame(evt)} className="bold">Choose</button>)
  }
  else if (gameState==='victory' || gameState==='defeat'){
    return (<button onClick={(evt) => progressTheGame(evt)} className="bold">Try Again</button>)
  }
}
  return (
    <>
    <div className='title-bar'>
      <h1> Kanye guess which it is yet?</h1>
      <div className="score-container">
          <p>Score:</p>
          <p>{score}</p>
        </div>
    </div>
    <QuizCard currentOptions={options} updatechoice={updatechoice} gameState={gameState}/>
    {renderButton()}
    </>
  );
}

export default App;
