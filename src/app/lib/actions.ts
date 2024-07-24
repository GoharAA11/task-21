"use server"

import { InputUser, PartialUser } from "./types"
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { addUser, getUserByLogin   } from "./api"
import { redirect } from "next/navigation"

export const handleSignup = async (prev:unknown, data:FormData) => {
 
    let user:PartialUser= {
        id: nanoid(),
        name: data.get('name') as string,
        surname: data.get('surname') as string,
        login: data.get('login') as string,
        password:data.get('password') as string
    }
   
    let loginValid=  await getUserByLogin(user.login ?? "")
    if(loginValid){
        return {
            message:"This login is used, please choose another one"
        }
    }

  

    let Regexp=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if(!Regexp.test(user.password ?? "")){
        return{
            message:"Password must be at least 6 characters long and include a letter, a number, and a symbol"
        }
    }

   

    if(user.password){
        user.password = await bcrypt.hash(user.password, 10)
    }



    
    const result = addUser(user)
    console.log(result)


 
    redirect("/login")


}

export const handleLogin = async (prev:unknown, data:FormData) => {
    if(!data.get("login") || !data.get("password")){
        return {
            message:"Please fill all the fields"
        }
    }

    let login = data.get('login') as string
    let result =await getUserByLogin(login)
    if(!result){
        return{
            message:"There is no user with this login, please try again"
        }
    }
    console.log(result)

    let password= data.get("password") as string
    let passValid= await bcrypt.compare(password,result.password)
    if(!passValid){
        return {
            message:"The password is incorrect, please try again"
        }
    }


    console.log(result)
    redirect("/profile")



}