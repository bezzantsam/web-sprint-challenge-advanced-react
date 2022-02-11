/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

export default function AppFunctional(props) {
  const [grid, setGrid] = useState([]);
  const [moves, setMoves] = useState(0);
  const [email, setEmail] = useState('')
  const [coordinates, setCoordinates] = useState([2,2])
  const [message, setMessage] =  useState('')

  useEffect(()=> {
    resetGame();
  },[]);

  useEffect(() =>{
    
  },
  [grid,moves,email])

  const resetGame = () => {
    const gameMatrix = [
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ];
    setGrid(gameMatrix); 
    setMoves(0)
    setEmail('')
  }

  const findCurrentPosition = () => {
    for (let row = 0; row < grid.length; row++){
      for(let column = 0; column < grid[row].length; column++){
        if(grid[row][column] === 1){
          let direction = {row, column}
          return direction;
        }
      }
    }
  }

  const handlerDirectional = (e) => {
    const direction = e.target.attributes.id.value;
    setMoves(moves + 1);
    
    const {row,column} = findCurrentPosition();
    
    const copyGrid = [...grid];
    switch(direction){
      case 'up':   
        var newAddrColUp = row - 1    
        if(newAddrColUp < 0){
          setMessage(`You can't go ${direction}`);
          return;
        }
        setMessage('')
        copyGrid[newAddrColUp][column] = 1
        copyGrid[row][column] = 0
        setCoordinates([newAddrColUp+1,column+1])
        setGrid(copyGrid)
        break;
      case 'down':
        var newAddrColDown = row + 1    
        if(newAddrColDown > 2){
          setMessage(`You can't go ${direction}`);
          return;
        }
        setMessage('')
        copyGrid[newAddrColDown][column] = 1
        copyGrid[row][column] = 0
        setCoordinates([newAddrColDown+1,column+1])
        setGrid(copyGrid)
        break;
      case 'left':
        var newAddRowLeft = column - 1    
        if(newAddRowLeft < 0 ){
          setMessage(`You can't go ${direction}`);
          return;
        }
        setMessage('')
        copyGrid[row][newAddRowLeft] = 1
        copyGrid[row][column] = 0
        setCoordinates([row+1,newAddRowLeft+1])
        setGrid(copyGrid)
        break;
      case 'right':
        var newAddRowRight = column + 1    
        if(newAddRowRight > 2 ){
          setMessage(`You can't go ${direction}`);
          return;
        }
        setMessage('')
        copyGrid[row][newAddRowRight] = 1
        copyGrid[row][column] = 0
        setCoordinates([row+1,newAddRowRight+1])
        setGrid(copyGrid)
        break;
      case 'reset':
      default:
        resetGame();
        break
    }
    
  }

  const handleEmailChange = (e) => {
    const emailText = e.target.value;
    setEmail(emailText)
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coordinates[0]},{coordinates[1]})</h3>
        <h3 id="steps">You moved {moves} times</h3>
      </div>
      <div id="grid">
        {
          grid.map( (rows) =>{
            return rows.map(cell => {
              // eslint-disable-next-line react/jsx-key
              return (<div 
                className={`square ${cell === 1 ? 'active':''}`}>
                  {`${cell === 1 ? 'B':''}`}
                </div>)
            })
          })
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(e)=>handlerDirectional(e)}>LEFT</button>
        <button id="up" onClick={(e)=>handlerDirectional(e)}>UP</button>
        <button id="right" onClick={(e)=>handlerDirectional(e)}>RIGHT</button>
        <button id="down" onClick={(e)=>handlerDirectional(e)}>DOWN</button>
        <button id="reset" onClick={(e)=>handlerDirectional(e)}>reset</button>
      </div>
      <form>
        <input id="email" type="email" onChange={(e)=> handleEmailChange(e)} placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
