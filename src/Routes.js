import { useContext } from 'react'
import { Routes, Route , Redirect, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home  from './components/Home'
import { useNavigate } from 'react-router-dom';


import { UserContext } from './App'
import { colors } from '@mui/material'

function RoutesComp() {
  const userContext = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic

    // Redirect to the dashboard
    Navigate('/');
  };

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = true;
  
  return (
    <>
      <Routes>
        {userContext.email && (
          <Route path='/' element={<>Welcome {userContext.email}<Home/>
          </>} />
          // <Route path='/' element={ <Home/>}
          //  />
        )}
        {!userContext.email && (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path="/Dashboard" component={Home} /> */}
        {/* <Redirect to="/login" /> */}
          </>
        )}
      </Routes>
    </>
  )
}

export default RoutesComp
