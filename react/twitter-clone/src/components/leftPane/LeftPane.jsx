import { NavLink } from 'react-router-dom';
import './LeftPane.scss';

const LeftPane = () => {
    return(
        <div className="left-pane">
            <div className="container">
                <header>Twitter icon here</header>
                <nav>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/explore">
                        Explore
                    </NavLink>
                    <NavLink to="/notification">
                        Notification
                    </NavLink>
                    <NavLink to="/messages">
                        Messages
                    </NavLink>
                    <NavLink to="/bookmarks">
                        Bookmarks
                    </NavLink>
                    <NavLink to="/lists">
                        Lists
                    </NavLink>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </nav>

                <button className="tweet">Tweet</button>

                <footer>
                    <button className="account">
                        <div className="photo">
                            <img 
                                alt="User"
                                src="./img/blank-profile-picture.webp"
                            />
                        </div>
                    </button>
                </footer>

            </div>
        </div>
    );
}

export default LeftPane;