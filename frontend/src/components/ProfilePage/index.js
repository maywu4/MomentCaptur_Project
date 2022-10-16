import { useDispatch, useSelector } from "react-redux"
// import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/user";
import littleIsland from './littleIsland.png'; 
import EditInfoButton from "./EditInfoButton";
import Navigation from "../Navigation";
import profilePic from './profilePic.png';
import './ProfilePage.css'

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    // const user = userId ? useSelector(getUser(userId)) : { username:'', email: '', firstName: '', lastName: '', age: 35, password: '', about: '' }
    const user = useSelector(getUser(userId));
    // const [firstName, setFirstName] = useState();
    // const [lastName, setLastName] = useState();
    // const [username, setUsername] = useState();
    const [about, setAbout] = useState('Write a little about yourself'); 
    const [selectTab, setSelectTab] = useState('aboutTab');
    const currentUser = useSelector(state => state.session.user); // make this dynamic  
    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId, dispatch]);

    if (!user) return null;

    const aboutSelection = (
        <div className="selections" id="aboutSelection">
            
            {(currentUser.id === user.id ? <textarea defaultValue={about}></textarea> : user.about )}
            <h4>Joined {user.createdAt}</h4>
            <h4>Email {user.email} </h4>
        </div>
    );

    const photostreamSelection = (
        <div className="selections" id="photostreamSelection">
            <ul>
                {/* add user photos posted */}
                {/* {user.photos.map(photo => <li key={photo}>{photo}</li>)} */}
                <li><img src={ littleIsland} alt="pic 1" /></li>
                <li><img src={littleIsland} alt="pic 2" /></li>
                <li><img src={littleIsland} alt="pic 3" /></li>
                <li><img src={littleIsland} alt="pic 4" /></li>
                <li><img src={littleIsland} alt="pic 5" /></li>
                <li><img src={littleIsland} alt="pic 6" /></li>
            </ul>
        </div>
    );

    const favesSelection = (
        <div className="selections" id="favesSelection">
            <ul>
                {/* add user favorited/liked photos */}
                {/* {user.favorites.map(photo => <li key={photo}>{photo}</li>)} */}
                <li><img src="https://picsum.photos/206/206" alt="fave 1" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 2" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 3" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 4" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 5" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 6" /></li>
            </ul>
        </div>
    );

    const selectAbout = () => {
        setSelectTab('aboutTab');
    };


    const selectPhotostream = () => {
        setSelectTab('photostreamTab');
    };

    const selectFaves = () => {
        setSelectTab('favesTab');
    };


    const conditionalShow = () => {
        switch (selectTab) {
            case 'photostreamTab':
                return photostreamSelection;
            case 'favesTab':
                return favesSelection;
            default:
                return aboutSelection;
        }
    };

    return (
        <div className="userProfile">
            <Navigation user={user}/>
            <div className="userCover">
                {/* <img src={ profilePic} alt="user_profile_pic" /> */}
                
                {user.picture ? <img src={user.picture} alt='' /> : <img src={profilePic} alt="" /> }
                
                <div id="userNames">
                    <div id="coverHeading">
                        <h4> {user.firstName} {user.lastName}</h4>
                        {(currentUser.id === user.id ? <EditInfoButton /> : null )}
                    </div>
                    <br />
                    <div id="userInfo">
                        <ul id="userInfoLeft">
                            
                            <li> {user.username} </li>
                            <li> # Followers</li>
                            <li> # Following</li>
                        </ul>
                        <ul id="userInfoRight">
                            <li> # Photos</li>
                            <li> Joined {user.createdAt.slice(0,4)}</li>
                        </ul>
                    </div>
                </div>
                {/* add followers & following */}
                {/* add # of photos */}
            </div>
            <div className="selectionMenu">
                {/* nest in link - /people/username/ */}
                {/* nest in link - /photos/username/ */}
                {/* nest in link - /photos/username/favorites */}
                {/* <button className="selectedTab" onClick={selectTab('click', "aboutSelection")}>About</button>
                <button className="selectedTab" onClick={selectTab('click', "photostreamSelection")}>Photostream</button>
                <button className="selectedTab" onClick={selectTab('click', "favesSelection")}>Faves</button>  */}
                <ul className="selectionTabs">
                    <li className={ selectTab === 'aboutTab' ? 'active' : "" } onClick={ selectAbout }>About</li>
                    <li className={selectTab === 'photostreamTab' ? 'active' : ""} onClick={ selectPhotostream } >Photostream</li>
                    <li className={ selectTab === 'favesTab' ? 'active' : "" } onClick={ selectFaves } >Faves</li>
                </ul>
            </div>
            <div className="menuSelection">
                {/* conditional to render selection based on tab selected in 'profileMenu' */}
                { conditionalShow()}
                {/* { aboutSelection }
                { photostreamSelection }
                { favesSelection } */}
            </div>
        </div>
    )
}

export default ProfilePage;