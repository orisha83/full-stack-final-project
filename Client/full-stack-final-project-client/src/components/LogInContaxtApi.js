
import React, {  createContext, useState } from "react";

export const LogInContext = createContext();

  export const LogInContextProvider = props => {
    const [isLogedIn,setIsLogedIn] = useState(false)
    const [logInUsers,setLogInUsers] = useState("")
    const [logInUser,setLogInUser] = useState("")
    const [isAdmin,setIsAdmin] = useState(false)
  
    return (
      <LogInContext.Provider value={{ isLogedIn : [isLogedIn,setIsLogedIn], logInUsers : [logInUsers,setLogInUsers], logInUser : [logInUser,setLogInUser], isAdmin : [isAdmin,setIsAdmin]}}>
        {props.children}
      </LogInContext.Provider>
    );
  };