import {useState,useEffect} from "react"
import { Link,useLocation,useNavigate } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/userApiSlice"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
const Login = () => {
  const [email,setEmail]=useState("" )
  const [password,setpass]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [login,{isLoading}]=useLoginMutation()
  const {userInfo}=useSelector(state=>state.auth)

  const {search}=useLocation()
  const sp=new URLSearchParams(search)
  const redirect =sp.get('redirect')|| "/"

  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
      const res=await login({email,password}).unwrap()
      dispatch(setCredientials({...res}))
    }catch(error){
      toast.error(error?.data?.message|| error.message)
    }
  }

  useEffect(()=>{
    if (userInfo){
      navigate(redirect)
    }
  },[navigate,redirect,userInfo])
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">
          Signin
        </h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label htmlFor="email" className="black text-sm font-medium textwhite"> Email</label>
            <input type="text" id="email" className="mt-1 pt-2 border rounded w-full" value={email} onChange={e=>setEmail(e.target.value)} ></input>
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="black text-sm font-medium textwhite"> Password</label>
            <input type="text" id="password" className="mt-1 pt-2 border rounded w-full" value={password} onChange={e=>setpass(e.target.value)} ></input>
          </div>
          <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Signing In...":"Sign in"}</button>

          {isLoading &&<Loader/>}
        </form>
        <div className="mt-4">
          <p className="texxt-white">
            New Customer ?{" "}
            <Link to={redirect ?`/register?redirect=${redirect}`:`register`} className="text-pink-500 hover:underline">
            Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
