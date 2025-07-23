import { message } from 'antd'
import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

const Auth=createContext()

const initialState={isAuth:false,user:{}}

const reducer=(state,{type,payload})=>{
    switch (type){
        case "SET_LOGGED_IN" :return{isAuth:true,user:payload.user}
        case "SET_PROFILE" :return{...state,user:payload.user}
        case "SET_LOGGED_OUT" :return initialState
        default :return state
    }
}

const AuthContext = ({children}) => {

    const [state,dispatch]=useReducer(reducer,initialState)
    const [isAppLoading,setIsAPPLoading]=useState(true)


    const getUser=useCallback(()=>{
        const token=localStorage.getItem("jwt")
        const config={headers:{Authorization : `Bearer ${token}`}}

        axios.get(`http://localhost:8000/auth/get`,config)
        .then(({status,data})=>{
            if(status == 201){
                // message.success(data.message)
                
                dispatch({type:"SET_LOGGED_IN",payload:{user:data.user}})
                console.log('user', data.user)
            }
        }).catch((error)=>{
            message.error("Something went wrong well getting data")
            console.log('error', error)
        }).finally(()=>{
            setIsAPPLoading(false)
        })
    },[])

   useEffect(() => {
   const token=localStorage.getItem("jwt")
   if(token){

     getUser();
   }
  
}, [getUser]);

 const handleLogout = async () => {
        try {
            const token = localStorage.getItem("jwt");
             const config={headers:{Authorization : `Bearer ${token}`}}
            await axios.post("http://localhost:8000/auth/logout", {}, config);

            localStorage.removeItem("jwt"); // Remove token
            dispatch({ type: "SET_LOGGED_OUT" });
            message.success("Logged out successfully");
            navigate("/auth/login");
        } catch (error) {
            message.error("Logout failed");
            console.log('error', error)
        }
    };


  return (
    <Auth.Provider value={{...state,dispatch,isAppLoading,handleLogout}}>
        {children}
    </Auth.Provider>
  )
}


export const useAuthContext=()=>useContext(Auth)
export default AuthContext