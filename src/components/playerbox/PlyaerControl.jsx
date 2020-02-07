import React from 'react'
import Controls from './Controls'


function PlayerControl({updatePlayer}){
  return(
    <div className="controls-container">
      <div>
        <h1 className="title">Mad Max - Beyond LambdaD0me</h1>
      </div>
      <Controls updatePlayer={updatePlayer}/>
    </div>
  )
}

export default PlayerControl