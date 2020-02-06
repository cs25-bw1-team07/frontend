import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/header.scss';


function Header () {
    return(
        <>
        <div className= "link-container">
            <div className="link">
                <NavLink to={"/about"}>
                    <span>About</span>
                </NavLink>
            </div>
        </div>
        </>
    )
}

export default (Header)