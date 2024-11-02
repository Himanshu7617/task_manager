import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { authContext } from '../../context/AuthContext';
import {jwtDecode} from 'jwt-decode';


const Dashboard = () => {
  const [addingTask, setAddingTask] = useState(false);
  const {setTeamName,teamName, token} = useContext(authContext);
  const navigate = useNavigate();

  
  const handleLogOut = () => {
    
    const token = Cookies.get('access_token');
    if (token) {
      Cookies.remove('access_token');
      navigate('/home');
    }
    
  }

  const handleAddTask = async (e)=>{
    e.preventDefault();




    // const res = await fetch('http://localhost:3000/taskAPI/add-task')    


  }


  useEffect(()=>{
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    setTeamName(decodedToken.team_name);
  }, [token])
  return (
    <div className='dashboard-master-container'>
      <header>
        <h1>TeamFlow</h1>
        <h3>{teamName}</h3>
        <button className='logout-button' onClick={handleLogOut}>Logout</button>

      </header>

      <div className="body-container">
        <div className="body">

          <div className="all-task-container">
            <div onClick={handleAddTask} className="add-task">
              <div className="add-task-container">

              {/* <CiSquarePlus className='add-icon'></CiSquarePlus>
              <h4>Add task</h4> */}
              <form className="add-task-form"></form>
              </div>
            </div>
          </div>
          <div className="all-members-container">
            <button className="add-members-button">add member</button>

          </div>

        </div>


      </div>




    </div>
  )
}

export default Dashboard