import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'

const URL = "https://lambda-cs25-mud.herokuapp.com/api/room/";



function NewGame(props){
    console.log(props);
    const [rooms, setRooms] = useState([]);
	useEffect(() => {
		axios.get(URL, {
			"Authorization": `Token: ${localStorage.getItem("token")}`
		})
		.then(res => {
			// console.log("res from GET:", res);
			setRooms(res.data);
		})
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
            // console.log("STAT",rm,dirs);
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

            let extras=""
            roomArray[y][x]=[findClass(current_room),counter+extras];


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
        <>
            <div className="title">
                <h1>Mad Max - Beyond LambdaD0me</h1>
            </div>
            <div className="container">
                {/* <div className="gridBlank"></div>
                <div className="gridItem1"></div>
                <div className="gridItem2a"></div>
                <div className="gridItem2c"></div>
                <div className="gridItem3"></div>
                <div className="gridItem4"></div>
                <div className="gridItem1 rotatel"></div>
                <div className="gridItem1 rotater"></div>
                <div className="gridItem1 rotateo"></div> */}
                {roomArray.map(col => {
                            return col.map(item =>{
                            return <div className={item[0]}></div>
                            })    
                })
                } 


            </div>  
        </>
    );
}

export default NewGame;