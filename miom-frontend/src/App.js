import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'
import UsersList from './Components/UsersList';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import TermsAndConditions from './Components/TermsAndConditions'
import HomeUser from './pages/HomeUser'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomeUser />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/register' element={<Register />} />
        <Route path="/users" element={<UsersList />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/terms-conditions' element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
