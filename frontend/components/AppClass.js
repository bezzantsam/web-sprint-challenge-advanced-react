/* eslint-disable no-unused-vars */
import React from "react";
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    grid: [],
    moves: 0,
    email: '',
    coordinates: [2,2],
    message: ''
  }

  componentDidMount() {
    this.resetGame();
  }

  resetGame = () => {
    const copyState = {...this.state}
    copyState.grid = [
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ];
    copyState.moves = 0;
    copyState.email = ''
    this.setState(copyState)
  }

  findCurrentPosition = () => {
    const {grid} = this.state;
    for (let row = 0; row < grid.length; row++){
      for(let column = 0; column < grid[row].length; column++){
        if(grid[row][column] === 1){
          let direction = {row, column}
          return direction;
        }
      }
    }
  }

  handleEmailChange = (e) => {
    const emailText = e.target.value;
    const copyState = {...this.state};
    copyState.email = emailText;
    this.setState(copyState)
  }

  handlerDirectional = (e) => {
    const direction = e.target.attributes.id.value;
    const copyState = {...this.state}
    copyState.moves += 1;

    const {resetGame, findCurrentPosition} = this;
    
    const {row,column} = findCurrentPosition();
    
    switch(direction){
      case 'up':   
        var newAddrColUp = row - 1    
        if(newAddrColUp < 0){
          copyState.message = `You can't go ${direction}` ;
          this.setState(copyState)
          return;
        }
        copyState.message = ''
        copyState.grid[newAddrColUp][column] = 1
        copyState.grid[row][column] = 0
        copyState.coordinates = [newAddrColUp+1,column+1];
        this.setState(copyState)
        break;
      case 'down':
        var newAddrColDown = row + 1    
        if(newAddrColDown > 2){
          copyState.message = `You can't go ${direction}`;
          this.setState(copyState)
          return;
        }
        copyState.message = '';
        copyState.grid[newAddrColDown][column] = 1
        copyState.grid[row][column] = 0
        copyState.coordinates = [newAddrColDown+1,column+1];
        this.setState(copyState)
        break;
      case 'left':
        var newAddRowLeft = column - 1    
        if(newAddRowLeft < 0 ){
          copyState.message = `You can't go ${direction}`
          this.setState(copyState)
          return;
        }
        copyState.message =''
        copyState.grid[row][newAddRowLeft] = 1
        copyState.grid[row][column] = 0
        copyState.coordinates = [row+1,newAddRowLeft+1];
        this.setState(copyState)
        break;
      case 'right':
        var newAddRowRight = column + 1    
        if(newAddRowRight > 2 ){
          copyState.message = `You can't go ${direction}`
          this.setState(copyState)
          return;
        }
        copyState.message =''
        copyState.grid[row][newAddRowRight] = 1
        copyState.grid[row][column] = 0
        copyState.coordinates = [row+1,newAddRowRight+1];
        this.setState(copyState)
        break;
      case 'reset':
      default:
        resetGame();
        break
    }
  }


  checkWin = async (e) => {
    e.preventDefault();
    const copyState = {...this.state};
    const {email, moves} = copyState
    if(email.trim().length === 0){
      copyState.message = 'Ouch: email is required'
      this.setState(copyState)
      return;
    }
    const {row,column} = this.findCurrentPosition();
    const AxiosRequestObject = {
      url : "http://localhost:9000/api/result",
      method: "POST",
      data : {
        x : column + 1,
        y: row + 1,
        steps : moves,
        email
      }
    }
    //
    try {
      const response = await axios(AxiosRequestObject);
      copyState.message = response.data.message
      copyState.email = ''
      this.setState(copyState)
    } catch (e) {
      copyState.message = e.response.data.message
      copyState.email = ''
      this.setState(copyState)
    }
  }
  

  render() {
    const { className } = this.props;
    const {grid, coordinates, moves, message, email} = this.state;
    const {handleEmailChange, handlerDirectional, checkWin} = this;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
        <h3 id="coordinates">Coordinates ({coordinates[1]},{coordinates[0]})</h3>
        <h3 id="steps">You moved {moves} times</h3>
        </div>
        <div id="grid">
        {
          grid.map( (rows,rowIdx) =>{
            return rows.map((cell,cellIdx) => {
              // eslint-disable-next-line react/jsx-key
              return (<div key={`cell-${rowIdx}-${cellIdx}`} 
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
        <form onSubmit={(e) => checkWin(e)}>
        <input id="email" type="email" value={email} onChange={(e)=> handleEmailChange(e)} placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
// export default AppClass
