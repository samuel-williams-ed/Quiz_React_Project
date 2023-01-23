import { useState, useEffect } from 'react';
import './App.css';
import QuizCard from './containers/QuizCard';
import reduceString from './helpers/reduceString'
import Log from './helpers/Log'

function App() {

// useStates
const [gameState, setGameState] = useState(null) //setup, playing, victory, defeat
const [answerIndex, setAnswerIndex] = useState(0) //should never be > 3
const [guessIndex, setGuessIndex] = useState(null) //should never be > 3
const [score, setScore] = useState(0)

const [quoteOne, setQuoteOne] = useState(["Answer A"])
const [quoteTwo, setQuoteTwo] = useState(["Answer B"])
const [quoteThree, setQuoteThree] = useState(["Answer C"])
const [kanyeQuote, setKanyeQuote] = useState("Answer D")
const [listOfOptions, setOptions] = useState([])

// settings:
const mapAnswerToIndex = {"A":0, "B":1, "C":2, "D":3}
const quoteLength = 145

// manage React executions
useEffect(() => {
  buildOptionsArray()
}, [answerIndex, quoteOne, quoteTwo, quoteThree, kanyeQuote])

// fetch quotes from API
const getKanyeChat = () => {
  fetch('https://api.kanye.rest/')
  .then( res => res.json())
  .then( quote => { 

    // debug
    // console.log("We have retrieved Kanye's wisdom")
    // console.log(quote.quote)

    const option = reduceString(String(quote.quote), quoteLength)
    setKanyeQuote(option)
  })
  .catch("We have a problem accessing Kanye")
  }
const getQuoteOne = () => {
  // fetch('https://api.goprogram.ai/inspiration')
  fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
  .then(res => res.json())
  .then(quote => {
    // const option = reduceString(String(quote.quote), quoteLength)
    const option = reduceString(String(quote), quoteLength)
    setQuoteOne(option)
    console.log(`set Option 1 to: ${option}`)
    })
  }
const getQuoteTwo = () => {
  fetch('https://api.themotivate365.com/stoic-quote')
  .then(res => res.json())
  .then(quote => {
    const option = reduceString(String(quote.quote), quoteLength)
    setQuoteTwo(option)
      console.log(`set Option 2 to: ${option}`)
    })
  }
const getQuoteThree = () => {
    fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.json())
    .then(quote => {
      const option = reduceString(String(quote), quoteLength)
      setQuoteThree(option)
        console.log(`set Option 3 to: ${option}`)
      })
  }

    // loading functions
  const generateAnswerIndex = () => {
    let answer = Math.floor(Math.random() * 4);
    setAnswerIndex(answer) //should never be > 3
    Log('Generated new correct answer to be', answer)
  }
  const buildOptionsArray = () => {
    console.log(`~~~ Building options array...`)
    let result = [quoteOne, quoteTwo, quoteThree]
    result.splice(answerIndex, 0, kanyeQuote)
    // console.log(`answerIndex = :${answerIndex}`)
    // console.log(`inserting Kanye quote to position ${answerIndex}`)
    // console.log(result)
    setOptions(result)
  }

const getQuotes = () => {
  getQuoteOne()
  getQuoteTwo()
  getQuoteThree()
  getKanyeChat()
}

  // initialise data; make API calls
const loadGame = () => {
  console.log("Loading Game...")
  generateAnswerIndex()
  getQuotes()
  buildOptionsArray()
}

const progressTheGame = (evt) => {
  Log("Progressing the game")

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
    return (<button onClick={(evt) => progressTheGame(evt)} className="choose bold">Choose</button>)
  }
  else if (gameState==='victory' || gameState==='defeat'){
    return (<button onClick={(evt) => progressTheGame(evt)} className="choose bold">Go Again</button>)
  }
}
  return (
    <div className='container'>
    <div className='title-bar'>
      <h1> Kanye guess which it is yet?</h1>
      <div className="score-container">
          <p>Score:</p>
          <p>{score}</p>
        </div>
    </div>
    <QuizCard currentOptions={listOfOptions} updatechoice={updatechoice} gameState={gameState}/>
    {renderButton()}
    </div>
  );
}

export default App;
