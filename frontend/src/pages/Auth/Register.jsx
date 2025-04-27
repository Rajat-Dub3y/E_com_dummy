import { useState,useEffect } from "react"
import { Link,useLocation,useNavigate } from "react-router"
import { useDispatch,useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/userApiSlice"

const Register = () => {
    const [username,setusername]=useState('')
    const [email,setemail]=useState('')
    const [password,setpass]=useState('')
    const [confirm_pass,set_con_pass]=useState('')


    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [register,{isloading}]=useRegisterMutation()
    const {userInfo}=useSelector(state=>state.auth)
    const {search}=useLocation()
    const sp=new URLSearchParams(search)
    const redirect=sp.get('redirect')||'/'

    useEffect(()=>{
        if (userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])
    

    const submitHandler=async(e)=>{
        e.preventDefault()

        if (password!==confirm_pass){
            toast.error("Passwords do not match")
        }else{
            try{
                const res=await register({username,email,password}).unwrap()
                dispatch(setCredientials({...res}))
                navigate(redirect)
                toast.success("user successfully registered")
            }catch(error){
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }

  return (
    <div>
      <section>
        <div className="mr-[4rem] mt-[5rem] pl-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">
                Register
            </h1>
            <form onSubmit={submitHandler} className="containerw-[40rem]">
                <div className="my-[2rem]">
                    <label
                    htmlFor="name"
                    className="black text-sm font-medium text-black">
                        Name
                    </label>
                    <input type="text" id="name" className="mt-1  p-2 border rounded w-full" placeholder="Name" value={username} onChange={(e)=>setusername(e.target.value)}/>
                </div>
                <div className="my-[2rem]">
                    <label
                    htmlFor="email"
                    className="black text-sm font-medium text-black">
                        Email
                    </label>
                    <input type="text" id="email" className="mt-1  p-2 border rounded w-full" placeholder="E-mail" value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className="my-[2rem]">
                    <label
                    htmlFor="password"
                    className="black text-sm font-medium text-black">
                        Password
                    </label>
                    <input type="text" id="password" className="mt-1  p-2 border rounded w-full" placeholder="Password" value={password} onChange={(e)=>setpass(e.target.value)}/>
                </div>
                <div className="my-[2rem]">
                    <label
                    htmlFor="confirm_pass"
                    className="black text-sm font-medium text-black">
                        Confirm Password
                    </label>
                    <input type="text" id="confirm_pass" className="mt-1  p-2 border rounded w-full" placeholder="Confirm Password" value={confirm_pass} onChange={(e)=>set_con_pass(e.target.value)}/>
                </div>

                <button disabled={isloading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isloading? "Registering....":"Register"}</button>
                {isloading && <Loader />}
            </form>

            <div className="mt-4">
                <p className="text-black">
                    Already have a account ?{"  "}
                    <Link to={redirect ? `/login?redirect=${redirect}`:"/login"} className="text-pink-500 hover:underline">
                      Login
                    </Link>
                </p>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Register
