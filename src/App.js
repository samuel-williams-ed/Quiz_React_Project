import { useState, useEffect } from 'react';
import './App.css';
import QuizCard from './containers/QuizCard';
import reduceString from './helpers/reduceString'
import Log from './helpers/Log'

function App() {

// useStates
const [gameState, setGameState] = useState('setup') //setup, playing, victory, defeat
const [answerIndex, setAnswerIndex] = useState(0) //should never be > 3
const [guessIndex, setGuessIndex] = useState(null) //should never be > 3
const [score, setScore] = useState(0)

const [quoteOne, setQuoteOne] = useState(["Answer A"])
const [quoteTwo, setQuoteTwo] = useState(["Answer B"])
const [quoteThree, setQuoteThree] = useState(["Answer C"])
const [kanyeQuote, setKanyeQuote] = useState("Answer D")
const [listOfQuotes, setListOfQuotes] = useState([])

// settings:
const mapAnswerToIndex = {"A":0, "B":1, "C":2, "D":3}
const quoteLength = 145

// manage React executions
  useEffect(() => {
    console.log("UseEffect is firing...")
    getKanyeChat()
    getQuoteOne()
    getQuoteTwo()
    getQuoteThree()
  }, [])

  // useEffect(() => {
  //   Log("--- useEffect loggin gameState", gameState)
  // }, [gameState])

  // fetch API's
function getKanyeChat () {
  return fetch('https://api.kanye.rest/')
  .then( res => res.json())
  .then( quote => { 

    // debug
    // console.log("We have retrieved Kanye's wisdom")
    // console.log(quote.quote)
    //

    const option = reduceString(String(quote.quote), quoteLength)
    setKanyeQuote(option)
    console.log(`Kanye says "${option}"`)
    return option
  })
  .then(option => option)
  .catch("We have a problem accessing Kanye")
  }
function getQuoteOne () {
  return fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
  .then(res => res.json())
  .then(quote => {
    const option = reduceString(String(quote), quoteLength)
    setQuoteOne(option)
    console.log(`set Option 1 to: ${option}`)
    return option
    })
    .then(option => {
      Log("extra line to return option after setting quote one")
      return option})
      .catch((err) => {
        console.log(`problem getting quoteOne: ${err}`)
      })
  }
function getQuoteTwo() {
  return fetch('https://api.themotivate365.com/stoic-quote')
  .then(res => res.json())
  .then(quote => {
    const option = reduceString(String(quote.quote), quoteLength)
    setQuoteTwo(option)
    console.log(`set Option 2 to: ${option}`)
    })
    .catch((err) => {
      console.log(`problem getting quoteTwo: ${err}`)
    })
  }
function getQuoteThree() {
    return fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.json())
    .then(quote => {
      const option = reduceString(String(quote), quoteLength)
      setQuoteThree(option)
      console.log(`set Option 3 to: ${option}`)
      return option
      })
      .catch((err) => {
        console.log(`problem getting quoteThree: ${err}`)
      })
  }

    // loading functions
  const generateAnswerIndex = () => {
    // console.log(`generate random no: ${Math.random()}`)
    let ranNo = Math.floor(Math.random() * 4);
    setAnswerIndex(ranNo) //should never be > 3
    Log('~~~ Generated new correct answer to be', ranNo)
  }
  async function buildListOfQuotes() {
    console.log(`~~~ Building listOfQuotes array...`)
    let result = [quoteOne, quoteTwo, quoteThree]
    result.splice(answerIndex, 0, kanyeQuote)
    setListOfQuotes(result)
    Log("built list", result)
    return result
  }

  // initialise data; make API calls
const loadGame = (referenceNo) => {

  console.log(`~~~ Loading Game... no.${referenceNo}`)
  generateAnswerIndex()

  console.log("~~~ Getting Quotes...")
  Promise.all([getQuoteOne(), getQuoteTwo(), getQuoteThree(), getKanyeChat()])

    .then(() => buildListOfQuotes())
    .then(() => {
      setGameState('playing')
      console.log(`   |   GamesState === playing (loadGame)   |   ${gameState}`)
    }) 
}

// ### set gameState ### //
const progressTheGame = (evt) => {
  Log("~~~ Progressing the game")
  if (evt && gameState==='setup') {
    console.log(`   |   GamesState === setup   |  ${gameState}`)
    setGameState('loading')
    loadGame(2)
    return
  } else if (gameState==='loading') {
    console.log(`   |   GamesState === loading   |   ${gameState}`)
    //loadGame will progress gameState after fetch from API's
    return
  } else if (gameState==='playing'){
    console.log(`   |   GamesState === playing   |   ${gameState}`)
    if (guessIndex === answerIndex){
      console.log("Correct!")
      setGameState('victory')
      setScore(score+1)
    } else {
      console.log("wrong choice")
      setGameState('defeat')
    }
  } else if (gameState==='victory' || gameState==='defeat') {
    console.log(`   |   GamesState === victory/defeat   |   ${gameState}`)
    loadGame(99)
    setGameState('loading')
  }
}

// change guessIndex when user selects a new answer
const updatechoice = (event) => {
  if (gameState==='playing'){
    event.target.classList.toggle('red-border')
    const chosenLetter = event.target.value
    console.log(`User has chosen ${chosenLetter}`)
    setGuessIndex(mapAnswerToIndex[chosenLetter])
  }
}

const renderButton = () => {
  if (gameState==='setup'|| gameState===null) {
    return (<button onClick={(evt) => progressTheGame(evt)} className="bold cover">Start</button>)
  }
  else if (gameState==='loading') {
    return (<button className="bold cover">Loading</button>) 
  }
  else if (gameState==='playing') {
    return (<button onClick={(evt) => progressTheGame(evt)} className="choose bold">Choose</button>)
  }
  else if (gameState==='victory' || gameState==='defeat'){
    return (<button onClick={(evt) => progressTheGame(evt)} className="choose bold">Go Again</button>)
  }

  // ### build HTML ### //
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
    <QuizCard currentOptions={listOfQuotes} updatechoice={updatechoice} gameState={gameState}/>
    {renderButton()}
    </div>
  );
}

export default App;
