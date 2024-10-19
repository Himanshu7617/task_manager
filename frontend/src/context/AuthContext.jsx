import React, { useState, createContext } from 'react'


export const authContext = createContext();



const AuthContext = ({children}) => {

    const [loading, setLoading] = useState(false);

    //user credentials 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teamName, setTeamName] = useState('');
    const [firstName, setFirstName]  = useState('');
    const [lastName, setLastName] = useState('');


    const values = {loading, setLoading,
      //user Credentials
      email, setEmail, password, setPassword, teamName, setTeamName,
      firstName, setFirstName, lastName, setLastName };


  return (
    <authContext.Provider value={values}>
        {children}
        </authContext.Provider>
  )
}

export default AuthContext