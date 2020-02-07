import React from 'react'


function Controls({updatePlayer}){

  function handleClick(e){
    
    switch(e.target.textContent.toLowerCase()){
      case "up":
        updatePlayer("n")
        break
      case "down":
        updatePlayer("s")
        break
      case "left":
        updatePlayer("w")
        break
      case "right":
        updatePlayer("e")
        break
      default:
        console.log("WTF")
    }
  }

  return(
    <div className="control-box">
      <div><button onClick={handleClick}>Up</button></div>
      <div><button onClick={handleClick}>Down</button></div>
      <div><button onClick={handleClick}>Left</button></div>
      <div><button onClick={handleClick}>Right</button></div>
    </div>
  )
}

export default Controls