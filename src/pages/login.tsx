import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { getUser, useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponce } from '../types/api-types';
import { useDispatch } from 'react-redux';
import { userExist, userNotExist } from '../redux/reducer/userReaducer';

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [login] = useLoginMutation();
    const dispatch  = useDispatch();
    useEffect(()=>{
          onAuthStateChanged(auth, async (user)=>{
            if(user){
              const data = await getUser(user.uid);
              dispatch(userExist(data))
              console.log([data])
            }else{
              dispatch(userNotExist(null))
            }
          })
    },[])

    const loginHandler = async()=>{
      try{
          const provider = new GoogleAuthProvider();
          const {user} = await signInWithPopup(auth,provider) 
          console.log({
            name:user.displayName!,
            email:user.email!,
            gender,
            photo:user.photoURL,
            role:"user",
            dob:date,
            _id:user.uid!
          });
          const res = await login({
            name:user.displayName!,
            email:user.email!,
            gender,
            photo:user.photoURL,
            role:"user",
            dob:date,
            _id:user.uid!
          })
          if("data" in res){
            toast.success(res.data.message)
          }else{
            const error = res.error as FetchBaseQueryError;
            const message =(error.data as MessageResponce).message
            toast.error(message);
          }
      }
      catch(error){
        toast.error("sign in faild")
      }
    }
  
  return (
    <div className='login'>
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>  
    </div>
  )
}

export default Login