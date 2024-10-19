import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import AuthContext from './context/AuthContext'
import Home from './pages/home/Home'

const App = () => {
  return (
    <div>
      <AuthContext>
      
      <Routes>
        <Route path='/*' element={<Home/>} ></Route>
        <Route path='/signup' element={<SignUp></SignUp>} ></Route>
        <Route path='/login' element={<Login></Login>} ></Route>

      </Routes>
      </AuthContext>
    </div>
  )
}

export default App