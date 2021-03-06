import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import PlayerControl from '../components/playerbox/PlyaerControl';

const ROOMS_URL = "https://lambda-cs25-mud.herokuapp.com/api/room/";
const USER_INIT_URL = "https://lambda-cs25-mud.herokuapp.com/api/adv/init/"


function NewGame(props){
  const [rooms, setRooms] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({})
  
  // function to call on the buttons in the control panel to update playerInfo
  function updatePlayer(dir){
    axios.post("https://lambda-cs25-mud.herokuapp.com/api/adv/move/", {"direction": `${dir}`},
      {
        headers: {"Authorization": `Token ${localStorage.getItem("token")}`}
      }
    )
    .then(res => setPlayerInfo(res.data))
    .catch(err => console.log(err))
  }

	useEffect(() => {
        // Get all the rooms in the game
		axios.get(ROOMS_URL, {"Authorization": `Token: ${localStorage.getItem("token")}`})
		.then(res => setRooms(res.data))
        .catch(err => console.log(err))
        
        // Get the player data
        axios.get(USER_INIT_URL, {headers: {"Authorization": `Token ${localStorage.getItem("token")}`}})
        .then(res => setPlayerInfo(res.data))
        .catch(err => console.log(err))
	}, []);

    
    let roomArray=Array(10);
    if (rooms.length>0){
        for (let i=0;i<roomArray.length;i++){
            roomArray[i]=new Array(10).fill(['grid gridBlank']);
        }
        let roomKey={};
        for (let i=0;i<rooms.length;i++){
            roomKey[rooms[i].id]=rooms[i];
        }
        
        function findClass(rm){
            let dirs=[]
            if (rm.n_to>0){
                dirs.push('n');
            }
            if(rm.s_to>0){
                dirs.push('s');
            }
            if(rm.w_to>0){
                dirs.push('w');
            }
            if(rm.e_to>0){
                dirs.push('e');
            }
            let retString="grid "
            if (dirs.length==1){
                retString+= "gridItem1"
                if (dirs[0]=='s'){
                    retString+= " rotateo"
                }else if (dirs[0]=='w'){
                    retString+= " rotatel"
                }else if (dirs[0]=='e'){
                    retString+= " rotater"
                }
            }else if (dirs.length==2){
                if (dirs[0]=='n' && dirs[1]=='s'){
                    retString+= "gridItem2a rotater"
                } else if (dirs[0]=='w' && dirs[1]=='e'){
                    retString+= "gridItem2a"
                } else {
                    retString+= "gridItem2c";
                    if (dirs[0]=='n' && dirs[1]=='w'){
                        retString+= " rotater"       
                    }else if(dirs[0]=='n' && dirs[1]=='e'){
                        retString+= " rotateo"
                    }else if(dirs[0]=='s' && dirs[1]=='e'){
                        retString+= " rotatel"
                    }
                }
            }else if (dirs.length==3){
                retString+= "gridItem3"
                if (!dirs.includes('s')){
                    retString+= " rotateo"
                } else if(!dirs.includes('w')){
                    retString+= " rotatel"
                }else if (!dirs.includes('e')){
                    retString+= " rotater"
                }
            }else if (dirs.length==4){
                retString+= 'gridItem4'
            }
            return retString
        };
    
        let x=5;
        let y=9;
        let stack=[[6,0,-1,[x,y]]]
        let counter=0;
        while (stack.length>0 && counter<1000){
            counter++;
            let next_item=stack.pop();
            let current_room=roomKey[next_item[0]];
            // console.log("CURR",counter,current_room);
            let prev_room=next_item[1];
            x=next_item[3][0];
            y=next_item[3][1];
            let direction=next_item[2];
            //SET THE ROOM
            if (direction=='n') {
                y-=1;
            } else if (direction=='s'){
                y+=1;
            } else if (direction=='w'){
                x-=1;
            } else if (direction=='e'){
                x+=1
            }
            // console.log("XY",x,y);

            let extras=`${current_room.id}`
            roomArray[y][x]=[findClass(current_room),extras];


            //PUSH NEW ROOMS
            let newPush=0;
            // console.log("TEST",prev_room.id,current_room.w_to);
            if (prev_room.id!=current_room.n_to && current_room.n_to>0){
                stack.push([current_room.n_to,current_room,'n',[x,y]]);
                newPush=1;
            }
            if(prev_room.id!=current_room.s_to && current_room.s_to>0){
                stack.push([current_room.s_to,current_room,'s',[x,y]]);
                newPush=1;
            }
            if(prev_room.id!=current_room.w_to && current_room.w_to>0){
                stack.push([current_room.w_to,current_room,'w',[x,y]]);
                newPush=1;
            }
            if(prev_room.id!=current_room.e_to && current_room.e_to>0){
                stack.push([current_room.e_to,current_room,'e',[x,y]]);
                newPush=1;
            }
            // console.log("CURRENT STACK",stack);
        }
    
    
        // console.log("Rooms",roomArray)
    }
    

    return(
        <div className="game-container">
          <div className="container">
            {roomArray.map(col => {
              return col.map(item =>{
                if(item[1] == playerInfo.room_id){
                    return <div className={`${item[0]} player-square`}>{item[1]}</div>
                }
                return <div className={item[0]}>{item[1]}</div>
              })    
            })
            } 
          </div> 
          <PlayerControl updatePlayer={updatePlayer}/> 
        </div>
    );
}

export default NewGame;