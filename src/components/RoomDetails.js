import React from 'react';

const RoomDetails = props => {
    console.log(props);
    return (
        <div className='room-details'>
            {props.details && (
                <>
                    <p>Player: {props.details.name}</p>
                    <p>Room: {props.details.title}</p>
                    <p>{props.details.description}</p>
                    <div className="room-players">Players in {props.details.title}:
                        {props.details.players.map((el, i) => {
                            return <p>{el}</p>
                        })}
                    </div>
                </>
            )}
        </div>
    )
};

export default RoomDetails;
