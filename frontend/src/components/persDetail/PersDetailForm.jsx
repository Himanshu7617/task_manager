import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext';
import { z } from 'zod';
import { Link } from 'react-router-dom';


const PersDetailForm = () => {
    const { setSignUpProcessNo, setEmail, setPassword, setFirstName,setLastName } = useContext(authContext);


    //creating temporary variables to store the user info 
    
    const [errors, setErrors] = useState({});

    const [tempFirstName, setTempFirstName] = useState('');
    const [tempLastName, setTempLastName] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [tempPassword, setTempPassword] = useState('');

    const User = z.object({
        first_name: z.string().min(1, "First name is required!"),
        last_name: z.string().min(1, "Last name is required!"),
        email: z.string().email("Invalid email address!"),
        password: z.coerce.string().min(6, "Password must atleast 6 chararcters long!")
    });

    const handleNext = (e) => {
        e.preventDefault();

        const formData = {
            first_name: tempFirstName,
            last_name: tempLastName,
            email: tempEmail,
            password: tempPassword
        };

        //validating data against zod

        const validation = User.safeParse(formData);

        if (!validation.success) {
            //extract errors from the validation

            const fieldErrors = validation.error.format();

            setErrors({
                first_name: fieldErrors.first_name?._errors[0],
                last_name: fieldErrors.last_name?._errors[0],
                email: fieldErrors.email?._errors[0],
                password: fieldErrors.password?._errors[0]
            });

        } else {

            setErrors({});

            setFirstName(formData.first_name);
            setLastName(formData.last_name);
            setEmail(formData.email);
            setPassword(formData.password);
            setSignUpProcessNo(prev => prev+1);
        }
    }


    
    return (
        <div className='pers-detail-master-container'>
            <div className="persform-container">
                <form onSubmit={handleNext}>
                    <div className='credentials-container '>
                        <div className="credentials">
                            <label htmlFor="first_name">First Name:</label>
                            <input type='text' name='first_name' value={tempFirstName} placeholder='Rachel' onChange={(e) => { setTempFirstName(e.target.value) }}></input>
                        </div>
                        <div className="error-container">
                            {errors.first_name && <p className='errors'>{errors.first_name} </p>}
                        </div>
                    </div>
                    <div className='credentials-container '>
                        <div className="credentials">
                            <label htmlFor="last_name">Last Name:</label>
                            <input type='text' name='last_name' value={tempLastName} placeholder='Green' onChange={(e) => { setTempLastName(e.target.value) }}></input>
                        </div>
                        <div className="error-container">
                            {errors.last_name && <p className='errors'>{errors.last_name} </p>}
                        </div>
                    </div>
                    <div className='credentials-container '>
                        <div className="credentials">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name='email' value={tempEmail} placeholder='centralperk123@gmail.com' onChange={(e) => { setTempEmail(e.target.value) }} />
                        </div>
                        <div className="error-container">
                            {errors.email && <p className='errors'>{errors.email} </p>}
                        </div>
                    </div>
                    <div className='credentials-container '>
                        <div className="credentials">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name='password' value={tempPassword} placeholder="****" onChange={(e) => { setTempPassword(e.target.value) }} />
                        </div>
                        <div className="error-container">
                            {errors.password && <p className='errors'>{errors.password} </p>}
                        </div>
                    </div>
                    
                    <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                    <p>Login as a <Link to={'/member-login'}>Team Member</Link></p>
                    <button type='submit' >Next</button>

                </form>

            </div>


        </div>
    )
}

export default PersDetailForm