import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/header.scss';




function ProtectedHeader () {
    const logOut = () => {
        localStorage.removeItem("token");
    }
    return(
        <>
        <div className= "link-container protected">
            <div className="link">
                <NavLink className="home-btn" to={"/"}>
                    <span>Game</span>
                </NavLink>
            </div>
            <div className="link">
                <NavLink to={"/about"}>
                    <span>About</span>
                </NavLink>
            </div>
            <div className="link">
                <NavLink to={"/login"} onClick={logOut}>
                    <span>Logout</span>
                </NavLink>
            </div>
        </div>
        </>
    )
}

export default ProtectedHeader;