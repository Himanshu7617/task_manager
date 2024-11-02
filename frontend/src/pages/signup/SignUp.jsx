import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/AuthContext'


//importing form components 
import PersDetailForm from '../../components/persDetail/PersDetailForm';
import TeamNameForm from '../../components/teamName/teamNameForm';
import AddMemberForm from '../../components/addMember/AddMemberForm';

const SignUp = () => {

  const { email, password,teamName, firstName, lastName,
    signUpProcessNo, signUser, setSignUser, setAddingMember, addingMember} = useContext(authContext);




  // async function handleSignUpSubmit(e) {
  //   e.preventDefault();

  //   // const data = {firstName, lastName, email, teamName, password};
  //   const data = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     email: email,
  //     team_name: teamName,
  //     password: password,
  //     role: "leader",

  //   }
  //   console.log(data)

  //   const result = await fetch('http://localhost:3000/taskAPI/signup', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })

  //   if (result.ok) {
  //     console.log("success")
  //   }
  // }

  const signUpUser = async (data)=> {
    
      try {
        const result = await fetch('http://localhost:3000/taskAPI/signup', {
          method : "POST", 
          headers: {
            'Content-Type' : "application/json",
          },
          body : JSON.stringify(data)
        });
        const response = await result.json();

        //firing the request to add members

        if(response.ok){
          setAddingMember(true);
        }
        

      } catch (error) {
        console.log("error sending the request to the backend at front end level", error.stack);
      }
    }
    useEffect(()=>{
      if(signUser){
        const signUpData = {
          first_name : firstName,
          last_name : lastName, 
          email : email,
          team_name : teamName,
          password: password, 
          role: "leader"
        }
        signUpUser(signUpData);
      }
      !addingMember && setSignUser(false)

  },[signUser])

  return (
    <div className='signup-master-container'>
      <div className="process-container">
        <span className="processes process1">Personal Details</span>
        <span className="processes process2">Team Name</span>
        <span className="processes process3">Add Team members</span>

        <span className="tracker"
          style={{ left: signUpProcessNo === 1 ? '16.5%' : signUpProcessNo === 2 ? '46.5%' : signUpProcessNo === 3 ? '78.5%' : undefined }}
        ></span>
      </div>


      <div className="form-container">
        {signUpProcessNo === 1 ? <PersDetailForm/> : 
        signUpProcessNo === 2 ? <TeamNameForm/> : 
        signUpProcessNo === 3 && <AddMemberForm/> }
      </div>

      {/* <div className="register-links">
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
        </div> */}




    </div>
  )
}

export default SignUp


//okay so i want the singup process to happen in three steps

// 1. require basic details like email, name, password
//    - this also should have a link to login incase the user is already registered
//    - should also have next and back option and ofcourse the next is enabled only if the required data is filled and verified with zod

// 2. require the teamName
// 3. add team members
//    - this is optional as in user can add team members later too

// okay so i would create a div which would contain three spans three
//spans that will hold the name of each process
// and another div right below it which will have either a div or
// after element that'll move according to what step the user is
// currently on right now


//then i'll create one state value that'll hold the index of the
//step so that i can display the appropriate form
//now the final option will say create team and that and that
// only hit the createuser at the backend
