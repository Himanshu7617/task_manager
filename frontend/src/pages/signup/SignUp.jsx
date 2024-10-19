import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';

const SignUp = () => {

    const {email, setEmail, password, setPassword,
       teamName, setTeamName,firstName, setFirstName,
        lastName, setLastName } = useContext(authContext);



    async function handleSignUpSubmit(e){
        e.preventDefault();
        
        // const data = {firstName, lastName, email, teamName, password};
        const data = {
          first_name : firstName, 
          last_name : lastName, 
          email : email, 
          team_name: teamName, 
          password : password,
          role: "leader",
          
        }
        console.log(data)

        const result = await fetch('http://localhost:3000/taskAPI/signup', {
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
          <Link to='/login'>Login</Link>
        </div>
        <div className="form-master-container">
        <form className='teamleader-form' onSubmit={handleSignUpSubmit}>
            <div className='credentials '>
            <label htmlFor="first_name">First Name:</label>
            <input type='text' name='first_name' value={firstName} placeholder='Rachel' onChange={(e)=>{setFirstName(e.target.value)}}></input>
            </div>
            <div className='credentials '>
            <label htmlFor="last_name">Last Name:</label>
            <input type='text' name='last_name' value={lastName} placeholder='Green' onChange={(e)=>{setLastName(e.target.value)}}></input>
            </div>
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
            <button type='submit'>Create Team</button>

        </form>

        <hr />
        <form className='teamMember-form'></form>
        </div>
        
    </div>
  )
}

export default SignUp