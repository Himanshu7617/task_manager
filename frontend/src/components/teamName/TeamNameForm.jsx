import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import { set, z } from 'zod'


const TeamNameForm = () => {

    const {setTeamName, setSignUpProcessNo} = useContext(authContext)

    //temporary teamName var
    const [tempTeamName, setTempTeamName] = useState('');
    const [errors, setErrors] = useState({});

    const User = z.object({
        team_name : z.coerce.string().min(1, "Team Name is required!")
    })

    const handleNext = (e)=>{
        e.preventDefault();

        const validate = User.safeParse({team_name : tempTeamName});

        if(!validate.success){
            const fieldErrors = validate.error.format();


            setErrors({
                team_name : fieldErrors.team_name?._errors[0]
            })

        }else{
            setErrors({})

            setTeamName(tempTeamName);
            setSignUpProcessNo(prev => prev+1);
        }
    }




    return (
        <div className='teamName-master-container'>
            <div className="teamName-container">
                <form>
                    <div className='credentials-container '>
                        <div className="credentials">
                            <label htmlFor="teamName">Team Name: </label>
                            <input type="text" name='teamName' value={tempTeamName} placeholder='Coders' onChange={(e) => { setTempTeamName(e.target.value) }} />
                        </div>
                        <div className="error-container">
                            {errors.team_name && <p className='errors'>{errors.team_name}</p>}
                        </div>
                    </div>
                    <button type='submit' className='next-button' onClick={handleNext} >Next</button>
                    <button className="back-button" onClick={() => {e.preventDefault();setSignUpProcessNo(prev => prev - 1)}} >Back</button>

                </form>

            </div>
        </div>
    )
}

export default TeamNameForm