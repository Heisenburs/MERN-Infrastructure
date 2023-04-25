import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

import { getUser } from './utilities/users-service';
import './App.css';
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState(getUser())
  console.log(getUser());
  return (
   
    
    
    <main className="App">
      { user ?
      <>
      <NavBar user={user} setUser={setUser} />
     <Routes>
      
      <Route path='/orders/new' element={<NewOrderPage /> } />

      {/* second Route to Order History Page */}
      <Route path='/orders' element={ <OrderHistoryPage/> } />
     </Routes>
     </>
       :
        <AuthPage setUser={setUser} />}
        
    </main>
  );
}

export default App;
