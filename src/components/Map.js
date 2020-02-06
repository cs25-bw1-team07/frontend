import React, { useEffect } from 'react';
import '../styles/map.scss';
import { connect } from 'react-redux';
import { getMap, initPlayer, movePlayer } from '../store/game/Actions';
import MapView from './MapView';
import RoomDetails from './RoomDetails';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown, faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

toast.configure();

const GameMap = props => {
    useEffect(() => {
        props.initPlayer()
    }, []);

    useEffect(() => {
        if(props.player.data) {
            // if no room in direction
            if(props.player.data.error_msg) {
                toast(props.player.data.error_msg, {
                    autoClose: 3000,
                    draggable: false,
                    type: toast.TYPE.INFO
                })
            } else {
                props.getMap(props.player.data.title)
            }
        }
    }, [props.player]);

    return (
        <>
            <ToastContainer
                className='toast-container'
                toastClassName='dark-toast'
                transition={Slide}
                hideProgressBar={true}
            />
            <h1 className="game-heading">Game.py</h1>
            <div className="game-container">
            <div className="map-container">
                <MapView data={props.map.coordinates} />
                {/* {console.log(props.map.coordinates)} */}
            </div>
            <div className="game-controls">
                <RoomDetails details={props.player.data} />
                <div className='movement'>
                    <span className='direction-container'>
                        <div className='direction-ns'>
                            <p className='arrow' onClick={(() => props.movePlayer('n'))}>
                                {/* ⇧ */}
                                <FontAwesomeIcon icon={faArrowAltCircleUp}  size="sm"/>
                            </p>
                        </div>

                        <span className='container-ew'>
                            <div className='direction-ew'>

                                <p className='arrow' onClick={(() => props.movePlayer('w'))}>
                                    {/* ⇦ */}
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="sm" />
                                </p>
                            </div>

                            <div className='direction-ew'>
                                <p className='arrow' onClick={(() => props.movePlayer('e'))}>
                                    {/* ⇨ */}
                                    <FontAwesomeIcon icon={faArrowAltCircleRight}  size="sm"/>
                                </p>
                            </div>
                        </span>

                        <div className='direction-ns'>
                            <p className='arrow' onClick={(() => props.movePlayer('s'))}>
                                {/* ⇩ */}
                                <FontAwesomeIcon icon={faArrowAltCircleDown}  size="sm"/>
                            </p>

                        </div>
                    </span>

                </div>
            </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        map: state.gameReducer.map,
        player: state.gameReducer.player
    }
}

export default connect(mapStateToProps, { getMap, initPlayer, movePlayer })(GameMap);
