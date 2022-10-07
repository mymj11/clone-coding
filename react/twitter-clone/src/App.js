import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { LeftPane } from './components';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
      <LeftPane />
      <Routes>
        <Route path="/" exact>Home</Route>
        {/* 정확한 경로를 표시할 때 exact를 쓴다? */}
        <Route path="/explore">Explore</Route>
        <Route path="/notification">Notification</Route>
        <Route path="/messages">Messages</Route>
        <Route path="/bookmarks">Bookmarks</Route>
        <Route path="/lists">Lists</Route>
        <Route path="/profile">Profile</Route>
        {/* localhost:3000/explore과 같이 슬래시를 추가하여 경로를 적으면 해당 페이지가 뜬다. */}
      </Routes>
      {/* 이제는 Switch를 쓰지 않고 Routes를 쓴다. */}
      <div>Messages</div>
      <div>Right Pane</div>
    </div>
    </BrowserRouter>
  );
}

export default App;
