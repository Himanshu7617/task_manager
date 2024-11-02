import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom';

const MemberLogin = () => {

  const { email, setEmail, teamName, setTeamName } = useContext(authContext);
  const [tempEmail, setTempEmail] = useState('');
  const [tempTeamName, setTempTeamName] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();


  const User = z.object({
    team_name: z.string().min(2, "team name must atleast be more than 2 letters"),
    email: z.string().email()
  })


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: tempEmail,
      team_name: tempTeamName
    }
    //perform form validation
    const validation = User.safeParse(formData);

    if (!validation.error) {
      setTeamName(formData.team_name);
      setEmail(formData.email);


      const result = await fetch('http://localhost:3000/taskAPI/loginmember', {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify(formData)
      });

      const res = result.json();
      if (result.ok) {
        setTempTeamName('');
        setTempEmail('');
        navigate('/dashboard');
      }else{
        setLoginError(res.message);
      }
      





    }else{

      const fieldErrors = validation.error.format();
  
      setErrors({
        teamName: fieldErrors.team_name?._errors[0],
        email: fieldErrors.email?._errors[0]
      })
    }


  }
  return (
    <div className='login-master-container'>
      <header className='header-container'>
        <h1>TeamFlow</h1>

      </header>
      <form onSubmit={handleFormSubmit}>
        <div className='credentials-container'>
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
        {loginError && <p>{loginError}</p>}
        <button className="loginButton">Login</button>
      </form>


    </div>
  )
}

export default MemberLogin