import React, { useState, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'


export const authContext = createContext();



const AuthContext = ({ children }) => {

  const [loading, setLoading] = useState(false);

  //user credentials 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUser, setSignUser] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [token, setToken] = useState('');
  const [allMembers, setAllMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);

  //signup processes
  const [signUpProcessNo, setSignUpProcessNo] = useState(1);

  const checkToken = ()=>{
    const tempToken = Cookies.get('access_token');

    if(tempToken){
      setToken(tempToken);
    }
  }

  const values = {
    loading,
    setLoading,
    email,
    setEmail,
    password,
    setPassword,
    teamName,
    setTeamName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    signUpProcessNo,
    setSignUpProcessNo,
    signUser,
    setSignUser,
    loginUser,
    setLoginUser,
    token,
    setToken,
    checkToken,
    allMembers, 
    setAllMembers,
    addingMember, 
    setAddingMember,
    totalMembers, 
    setTotalMembers
};



useEffect(()=>{
  checkToken();
 
},[])

  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContext