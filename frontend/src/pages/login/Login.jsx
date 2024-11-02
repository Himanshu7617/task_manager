import { useState, useContext, useEffect } from 'react'
import { z } from 'zod';
import { authContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({})

  //defining some temp variables for form 
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [tempTeamName, setTempTeamName] = useState('');
  



  const { email, setEmail, password, setPassword, setTeamName, loginUser, setLoginUser } = useContext(authContext);


  //defining zod schema
  const User = z.object({
    email: z.string().email(),
    password: z.coerce.string().min(6, "password must be atleast 6 letters long!"),
    teamName: z.string().min(2, "All team names are more than 2 letters!")
  })

  //just storing the data in the auth Context yk

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: tempEmail,
      password: tempPassword,
      teamName: tempTeamName
    };

    //checking user data validation

    const valid = User.safeParse(formData);

    if (!valid.success) {

      const fieldErrors = valid.error.format();

      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
        teamName: fieldErrors.teamName?._errors[0]
      });
    } else {
      setErrors({})

      setEmail(formData.email);
      setTeamName(formData.teamName);
      setPassword(formData.password);

      setLoginUser(true)
    }


  }

  const logUserIn = async(data)=>{
    try {
      const result = await fetch("http://localhost:3000/taskAPI/login",{
        method: "POST", 
        credentials: "include",
        headers: {
          'Content-Type' : "application/json",
          'Accept' : "application/json"
        },
        body: JSON.stringify(data),
      });

      if(result.ok){
        navigate('/dashboard');
      }

      //apply login functionality i mean navigate to the dashboard as soon as you store the token in the cookies

    } catch (error) {
      console.log("error in the frontend sending request to the login route", error.stack);
    }
  }

  useEffect(()=>{
    if(loginUser){
      const loginData= {
        email : email,
        password : password
      }
      logUserIn(loginData);
    }
    setLoginUser(false);
    setTempTeamName('');
    setTempEmail('');
    setTempPassword("");
  },[loginUser])
  return (
    <div className='login-master-container'>
      <header className='header-container'>
        <h1>TeamFlow</h1>
      
      </header>
      <form onSubmit={handleLoginSubmit}>
        <div className='credentials-container '>
          <div className="credentials">
            <label htmlFor="teamName">Team Name: </label>
            <input type="text" name='teamName' value={tempTeamName} placeholder='Coders' onChange={(e) => { setTempTeamName(e.target.value) }} />
          </div>
          <div className="error-container">
            {errors.teamName && <p className='errors'>{errors.teamName}</p>}
          </div>
        </div>
        <div className='credentials-container '>
          <div className="credentials">
            <label htmlFor="email">Email: </label>
            <input type="text" name='email' value={tempEmail} placeholder='coders@gmail.com' onChange={(e) => { setTempEmail(e.target.value) }} />
          </div>
          <div className="error-container">
            {errors.email && <p className='errors'>{errors.email}</p>}
          </div>
        </div>
        <div className='credentials-container '>
          <div className="credentials">
            <label htmlFor="password">Password:  </label>
            <input type="text" name='password' value={tempPassword} placeholder='Coders' onChange={(e) => { setTempPassword(e.target.value) }} />
          </div>
          <div className="error-container">
            {errors.password && <p className='errors'>{errors.password}</p>}
          </div>
        </div>
        <p>Do not have an account? <Link to={"/signup"}>SignUp</Link></p>
        <button className="loginButton">Login</button>
      </form>


    </div>
  )
}

export default Login