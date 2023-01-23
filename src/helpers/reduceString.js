

const reduceString = function (inputString, numCharacters) {
    if (inputString.length < numCharacters) {
        // console.log(`Input String is ${inputString}`)
        // console.log(`Quote is small, only ${inputString.length}`)
        return inputString}

    else {
        const stringAsArray = inputString.split('')
        const splitLength = numCharacters -3

        let cutString = stringAsArray.slice(0, splitLength).join('')
        let result = cutString.trim().concat('',"...")
        
        // console.log(`reduceStringSze was ${inputString.length} reduced to ${splitLength}, returned: ${result}`)
        return result
    }
}
// 
export default reduceString