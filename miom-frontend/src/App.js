import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'
import UsersList from './Components/UsersList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/register' element={<Register />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
