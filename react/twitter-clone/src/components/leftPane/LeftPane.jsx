import { NavLink } from 'react-router-dom';
import './LeftPane.scss';

const LeftPane = () => {
    return(
        <div className="left-pane">
            <div className="container">
                {/* container div의 위치를 고정할 것이다. 
                container 내부의 다른 섹션을 스크롤하는 동안 화면에 고정될 것이다.*/}
                <header>Twitter icon here</header>
                {/* header에는 트위터 아이콘을 넣을 것. */}
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
                {/* navlink를 사용하여 react twitter 앱 탐색하기. */}
                {/* 내부에 웹 애플리케이션을 구축할 때 접근성을 고려해야 한다.
                react-router-dom의 탐색 링크 구성 요소 사용.
                다른 구성 요소를 탐색하는데 사용할 것이므로 navlink를 가져오자. 
                탐색 링크를 클릭하면 페이지를 다시 로드하지 않고 구성요소로 이동할 수 있다.*/}

                <button className="tweet">Tweet</button>

                {/* LeftPane 구성요소에 바닥글 추가. */}
                <footer>
                    <button className="account">
                    {/* 계정 버튼.
                    계정 버튼 내부에 이미지와 사용자 이름이 포함.*/}
                        <div className="photo">
                            <img 
                                alt="user"
                                src="./img/blank-profile-picture.webp"
                            />
                        </div>
                        {/* 하나의 div안에 두 개의 열이 있는데 1번 열에는 사진이 있고 2번 열에는 두 개의 행이 포함되게 하자.*/}
                        <div>
                            <div className="name">name</div>
                            <div className="username">@username</div>
                        </div>
                    </button>
                </footer>

            </div>
        </div>
    );
}

export default LeftPane;