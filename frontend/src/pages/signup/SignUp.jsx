import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'

const SignUp = () => {

    const {email, setEmail, password, setPassword, userName, setUserName, teamName, setTeamName} = useContext(authContext);



    async function handleSignUpSubmit(e){
        e.preventDefault();

        const data = {userName, email, password, teamName};
        
    }



  return (
    <div className='signup-master-container'>
        <div className="form-master-container">
        <form className='teamleader-form' onSubmit={handleSignUpSubmit}>
            <div className='credentials '>

            <label htmlFor="userName">Name:</label>
            <input type='text' name='userName' value={userName} placeholder='Rachel Green' onChange={(e)=>{setUserName(e.target.value)}}></input>
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