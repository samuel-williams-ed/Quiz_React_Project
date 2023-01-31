const Log = (message, object1=null, object2=null) => {
    if (!object2){
        console.log(`${message}: ${object1}`)
    } else {
    console.log(`${message}: ${object1} and ${object2}`)
    }
}

export default Log