import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LeftPane } from './components';
import {RightPane} from './components';
//components의 index.js에서도  export를 해줘야 한다. 왜일까?
import './App.scss';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Notification from './components/Notification/Notification';
import Messages from './components/Messages/Messages';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Lists from './components/Lists/Lists';
import Profile from './components/Profile/Profile';
//default로 가져오는 것은 {} 없애야 한다.

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
      <LeftPane />
      <div>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/bookmarks" element={<Bookmarks />}></Route>
        <Route path="/lists" element={<Lists />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* localhost:3000/explore과 같이 슬래시를 추가하여 경로를 적으면 해당 페이지가 뜬다. */}
      </Routes>
      </div>
      {/* 이제는 Switch를 쓰지 않고 Routes를 쓴다. */}

      <RightPane />
      <div className="right-pane">
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
