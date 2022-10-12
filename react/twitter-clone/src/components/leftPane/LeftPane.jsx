import { NavLink } from 'react-router-dom';
import { twitter, home, explore, notifications, messages, bookmarks, lists, profile, more } from './icons';
import './LeftPane.scss';
//가져오기

const LeftPane = () => {
    return(
        <div className="left-pane">
            <div className="container">
                {/* container div의 위치를 고정할 것이다. 
                container 내부의 다른 섹션을 스크롤하는 동안 화면에 고정될 것이다.*/}
                <header>{twitter}</header>
                {/* header에는 트위터 아이콘을 넣을 것. */}
                <nav>
                    <NavLink to="/" exact activeClassName="selected">
                        {/* 탐색경로를 위한 활성 클래스? selected 일치할 때마다 활성화 된다?
                        경로에 기본 url 외에 다른 항목이 없는지 여부?
                        selected를 하면 클릭한 버튼의 스타일이 마우스 커서를 떼도 유지된다.
                        예를 들어 메시지를 누르면 마우스를 떼도 다른 버튼을 누르기 전까지 블루로 되어 있다.
                        근데 나는 selected가 적용이 되지 않는다ㅠㅠ*/}
                        <span>{home} Home</span>
                        {/* span으로 묶어줘야 스타일 지정 범위를 줄일 수 있다. */}
                    </NavLink>
                    {/* /는 홈 경로를 통해서 온다는 것. 
                    exact를 써서 홈 경로와 정확히 일치하는 경우에만 활성화되도록 한다.
                    따라서 메시지를 클릭할 경우 같이 홈 버튼도 활성화되어 블루로 바뀌는 것을 해결할 수 있다.
                    다른 버튼을 클릭했을 때 더 이상 홈 버튼이 같이 블루로 바뀌지 않는다.*/}
                    <NavLink to="/explore" activeClassName="selected">
                        <span>{explore} Explore</span>
                    </NavLink>
                    <NavLink to="/notification" activeClassName="selected">
                        <span>{notifications} Notification</span>
                    </NavLink>
                    <NavLink to="/messages" activeClassName="selected">
                        <span>{messages} Messages</span>
                    </NavLink>
                    <NavLink to="/bookmarks" activeClassName="selected">
                        <span>{bookmarks} Bookmarks</span>
                    </NavLink>
                    <NavLink to="/lists" activeClassName="selected">
                        <span>{lists} Lists</span>
                    </NavLink>
                    <NavLink to="/profile" activeClassName="selected">
                        <span>{profile} Profile</span>
                    </NavLink>
                    <button className="more" activeClassName="selected">
                        <span>{more} More</span>
                    </button>
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