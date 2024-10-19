import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';

const Login = () => {

    const {email, setEmail, password, setPassword,
       teamName, setTeamName,} = useContext(authContext);



    async function handleLoginSubmit(e){
        e.preventDefault();
        
        // const data = {firstName, lastName, email, teamName, password};
        const data = {
          email : email, 
          team_name: teamName, 
          password : password,
          role: "leader",
          
        }
        console.log(data)

        const result = await fetch('http://localhost:3000/taskAPI/login', {
          method : 'POST',
          headers : {
            'content-type' : 'application/json',
          },
          body : JSON.stringify(data),
        })
        
        if(result.ok){
          console.log("success")
        }
    }



  return (
    <div className='signup-master-container'>
        <div className="register-links">
          <Link to='/signup'>Sign Up</Link>
        </div>
        <div className="form-master-container">
        <form className='teamleader-form' onSubmit={handleLoginSubmit}>
            <div className='credentials '>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' value={email} placeholder='centralperk123@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className='credentials '>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' value={password} placeholder="****" onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <div className='credentials '>
            <label htmlFor="teamName">Team Name: </label>
            <input type="text" name='teamName' value={teamName} placeholder='optional' onChange={(e)=>{setTeamName(e.target.value)}} />
            </div>
            <button type='submit'>Login</button>

        </form>

        <hr />
        <form className='teamMember-form'></form>
        </div>
        
    </div>
  )
}

export default Login;