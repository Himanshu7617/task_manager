import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import AuthContext, { authContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import MemberLogin from './pages/login/MemberLogin'
import { useContext } from 'react'

const ProtectedRoute = ({ children }) => {

  const { token } = useContext(authContext);

  return token ? children : <Navigate to={'/home'}></Navigate>;
}

const App = () => {





  return (
    <div>
      <AuthContext>

        <Routes>
          <Route path='/*' element={<Home />} ></Route>
          <Route path='/signup' element={<SignUp></SignUp>} ></Route>
          <Route path='/login' element={<Login></Login>} ></Route>
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard></Dashboard></ProtectedRoute>} ></Route>
          <Route path='/member-login' element={<MemberLogin></MemberLogin>}></Route>


        </Routes>
      </AuthContext>
    </div>
  )
}

export default App