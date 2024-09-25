import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import AuthContext from './context/AuthContext'

const App = () => {
  return (
    <div>
      <AuthContext>
      
      <Routes>
        <Route path='/*' element={<SignUp></SignUp>} ></Route>
        <Route path='/signup' element={<SignUp></SignUp>} ></Route>

      </Routes>
      </AuthContext>
    </div>
  )
}

export default App