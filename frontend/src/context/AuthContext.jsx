import React, { useState, createContext } from 'react'


export const authContext = createContext();



const AuthContext = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [teamName, setTeamName] = useState('');

    const values = {loading, setLoading, email, setEmail, password, setPassword, userName, setUserName, teamName, setTeamName};


  return (
    <authContext.Provider value={values}>
        {children}
        </authContext.Provider>
  )
}

export default AuthContext