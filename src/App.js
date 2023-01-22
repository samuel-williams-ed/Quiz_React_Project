import { useState, useEffect } from 'react';
import './App.css';
import QuizCard from './containers/QuizCard';

function App() {

// useStates
const [options, setOptions] = useState([])
const [optionOne, setOptionOne] = useState(["Answer A"])
const [optionTwo, setOptionTwo] = useState(["Answer B"])
const [optionThree, setOptionThree] = useState(["Answer C"])
const [kanyeQuote, setKanyeQuote] = useState("Answer D")
const [answerIndex, setAnswerIndex] = useState(0) //should never be > 3

// useEffect
useEffect( () => {
  // getZenQuote()
  updateTheArray()
  setOptionOne()
  setOptionTwo()
  setOptionThree()
  getKanyeChat()
  setAnswerIndex()
},[])

// pull in Kanye API
const getKanyeChat = () => {
  fetch('https://api.kanye.rest/')
  .then( res => res.json())
  .then( quote => { 
    console.log("We have retrieved Kanye's wisdom")
    console.log(quote.quote)
    setKanyeQuote(quote.quote)
    console.log(`kanyeQuote = ${kanyeQuote}`)
  })
  .catch("We have a problem accessing Kanye")
}

// // pull in zenQuotes
// const getZenQuote = () => {
//   fetch('https://zenquotes.io/api/quotes')
//   .then(res => res.json)
//   .then( quotes => {
//     let tempArray = []
//     tempArray.push(quotes[0].q)
//     tempArray.push(quotes[1].q)
//     tempArray.push(quotes[2].q)
//     tempArray.push(quotes[3].q)
//     setNewQuotes(tempArray)
//     console.log(`Pushing new zen quotes into temp array: ${tempArray}`)
//     console.log(`Quotes now = ${quotes}`)
//   })
//   .catch("We have a problem getting zen quotes")
// }

// fetch quotes
const getQuoteOne = () => {
  fetch('https://api.goprogram.ai/inspiration')
  .then(res => res.json())
  .then(quote => {setOptionOne(quote.quote)
      console.log(`set Option 1 to: ${quote.quote}`)
    })
  }
const getQuoteTwo = () => {
  fetch('https://api.goprogram.ai/inspiration')
  .then(res => res.json())
  .then(quote => {setOptionTwo(quote.quote)
      console.log(`set Option 1 to: ${quote.quote}`)
    })
  }
  const getQuoteThree = () => {
    fetch('https://api.goprogram.ai/inspiration')
    .then(res => res.json())
    .then(quote => {setOptionThree(quote.quote)
        console.log(`set Option 1 to: ${quote.quote}`)
      })
    }

// insert the kanye quote at universal index tracker
function updateTheArray() {
  setAnswerIndex(2) //should never be > 3
  getQuoteOne()
  getQuoteTwo()
  getQuoteThree()
  
  getKanyeChat()
  console.log(`useStates = ${optionOne}, ${optionTwo}, ${optionThree}, ${kanyeQuote}`)
  
  setOptions([optionOne, optionTwo, optionThree, kanyeQuote])
  console.log(`Options = ${options}`)
  }

  return (
    <>
    <h1> Kanye guess who it is yet?</h1>
    <QuizCard currentOptions={options}/>
    <button onClick={() => updateTheArray()}><b>Start</b></button>
    </>
  );
}

export default App;
