import './App.css';
import { Route } from "react-router-dom";
import Homepage from './Pages/homepage';
import ChatPage from './Pages/chatpage';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Homepage} exact />
      <Route path='/chats' component={ChatPage} />
    </div>
  );
}

export default App;
