import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import UserProfile from './pages/Profile/UserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseconfig'
import { login, logout, selectUser } from './features/userSlice'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  
  useEffect(() => {

    const cleanUp = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        dispatch(login({
          uid,
          email
        }))
        
      } else {
            return dispatch(logout())  
      }
    });
    return cleanUp
  },[])

  return (
    <>
    <Router>
        {
          user == null ?
          <Login />
          :
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/profile' element={<UserProfile />} />
          </Routes>

        }
        

    </Router>
      

    </>
  )
}

export default App
