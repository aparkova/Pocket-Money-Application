import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Marketplace from './pages/Marketplace';
import Home from './pages/Home';
import SendTokens from './pages/SendTokens';
import './App.css'

function App () {

  return (
    <div>
      <BrowserRouter>
      <Sidebar>
       <Routes>    
          <Route path="/" element={<Home/>}/>
          <Route path="/sendtokens" element={<SendTokens/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
       </Routes>
      </Sidebar>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
