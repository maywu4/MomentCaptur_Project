import { useSelector } from "react-redux"
import React from "react";
import UserButton from "./UserButton";
import logoImg from './logo.png'
import githubIcon from './icons8-github-480.png'
import linkedInIcon from './icons8-linkedin-512.png'
import './Navigation.css'
import ProfileMenu from "./ProfileMenu";
import { NavLink } from "react-router-dom";



const Navigation = ({user, setSelectTab}) => {
    const currentUser = useSelector(state => state.session.user);
    const loggedInLinks = (
        <div>
            <ul className="loggedInLinks">
                <li id="youMenu"><ProfileMenu setSelectTab={setSelectTab}/></li>
                <li id="userMenu"><UserButton user={currentUser} /></li>
            </ul> 
        </div>
    );

    const loggedOutLinks = (
        <>
            <ul>
                <li id="logInButton"><NavLink to={"/login"}>Log In</NavLink></li>
                <li id="signUpButton"><NavLink to={"/sign-up"}>Sign Up</NavLink></li>
                <li>
                    <a href="https://github.com/maywu4">
                        <img id='githubLink' src={githubIcon} alt="github-logo" />
                     </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/maywu4">
                        <img id='linkedinLink' src={linkedInIcon} alt="linkedIn-logo" width="60px" hieght="60px" />
                    </a>
                </li>
            </ul>
        </>
    );


    
    return (
        <div className="navBar">
            <div className="left">
                <img src={ logoImg } alt="MomentCaptur logo" />
                <h1><NavLink to="/">momentCaptur</NavLink></h1>
            </div>
            <div className="navMenu">
                { currentUser ? loggedInLinks : loggedOutLinks}
            </div>
        </div>


);

};

export default Navigation;

// const solidNavBar = () => {
//     if (currentUser) {
//         return { backgroundColor: "black" }
//     }
// };

// { currentUser ? (style = {{ backgroundColor: "black" } }) : (style = {{ backgroundColor: "white" }}) } 
