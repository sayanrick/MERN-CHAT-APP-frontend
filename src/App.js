import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Use render instead of component */}
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route exact path="/chats" render={(props) => <ChatPage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
