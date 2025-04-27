import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/userApiSlice'


const Profile = () => {

    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpass]=useState("")
    const [con_password,set_con_pass]=useState("")



    const {userInfo}=useSelector(state=>state.auth)


    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()

    useEffect(()=>{
        setusername(userInfo.username)
        setemail(userInfo.email)
    },[userInfo.email,userInfo.username])


    const dispatch=useDispatch()


    const submitHandler=async(e)=>{
        e.preventDefault()

        if (password!==con_password){
            toast.error("Passwords do not match")
        }else{
            try{
                const res=await updateProfile({_id:userInfo._id,username,email,password})
                dispatch(setCredientials({...res}))
                toast.success("Updated successfully")
            }catch(error){
                toast.error(error?.error.message.data)
            }
        }
    }



  return (
    <div className="container mx-auto p-4 mt-[5rem]">
        <div className="flex justify-center align center md:flex md:space-x-2">
            <div className="md:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-black mb-4">Name</label>
                        <input type="text" placeholder="Name" className='form-input p-4 rounded-sm w-full' value={username} onChange={(e)=>setusername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-4">Email</label>
                        <input type="text" placeholder="Email" className='form-input p-4 rounded-sm w-full' value={email} onChange={(e)=>setemail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-4">Password</label>
                        <input type="text" placeholder="Password" className='form-input p-4 rounded-sm w-full' value={password} onChange={(e)=>setpass(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black mb-4">confirm password</label>
                        <input type="text" placeholder="Confirm Password" className='form-input p-4 rounded-sm w-full' value={con_password} onChange={(e)=>set_con_pass(e.target.value)} />
                    </div>
                    <div className="flex justify-between">
                        <button type='submit' className="bg-pink-500 text-white py-2 px-4 rounded hover:bd-pink-600">Submit</button>
                        <Link to="/user-orders" className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">My orders</Link>
                    </div>
                </form>
            </div>
            {loadingUpdateProfile &&<Loader />}
        </div>
    </div>
  )
}

export default Profile
