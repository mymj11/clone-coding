import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { LeftPane } from './components';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <LeftPane />
      <Switch>
        <Route path="/" exact>Home</Route>
        <Route path="/explore">Explore</Route>
        <Route path="/notification">Notification</Route>
        <Route path="/messages">Messages</Route>
        <Route path="/bookmarks">Bookmarks</Route>
        <Route path="/lists">Lists</Route>
        <Route path="/profile">Profile</Route>
      </Switch>
      <div>Right Pane</div>
    </div>
    </BrowserRouter>
  );
}

export default App;
