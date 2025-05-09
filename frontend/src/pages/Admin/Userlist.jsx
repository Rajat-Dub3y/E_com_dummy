import { useEffect,useState } from "react"
import { FaTrash,FaEdit,FaCheck,FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { useGetUsersQuery,useDeleteUserMutation,useUpdateUserMutation } from "../../redux/api/userApiSlice"
import Message from "../../components/Message"
import AdminMenu from "./AdminMenu"

const Userlist = () => {


    const {data:users,refetch,isLoading,error}=useGetUsersQuery()

    const [updateUser]=useUpdateUserMutation()
    const [deleteUser]=useDeleteUserMutation()
    const [editableUserId,setUserId]=useState(null)
    const [editableusername,setusername]=useState("")
    const [editableEmail,setEmail]=useState("")

    

    const toggleEdit=(id,username,email)=>{
        setEmail(email)
        setUserId(id)
        setusername(username)
    }

    const updateHandler=async(id)=>{
        try{
            console.log("heloo")
            await updateUser({
                UserId:id,
                username:editableusername,
                email:editableEmail
            }).unwrap()

            toggleEdit()
            console.log("helo")
            refetch()
        }catch(error){
            toast.error(error.data.message||error.error)
        }
    }

    const deleteHandler=async(id)=>{
        if(window.confirm("Are you Sure ??")){
            try{
                await deleteUser(id)
            }catch(error){
                toast.error(error.data.message || error.error)
            }
        }

    }

    useEffect(()=>{
        refetch();
    },[refetch]);

  return (
    <div className="p-4">
        <AdminMenu />
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
  <Loader />
) : error ? (
  <Message variant="danger">{error?.data?.message || error?.message}</Message>
) : (
  <div className="flex flex-col md:flex-row">
    <table className="w-full md:w-4/5 mx-auto">
      <thead>
        <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nmae</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Admin</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td className="px-4 py-2">{user._id}</td>
            <td className="px-4 py-2">{editableUserId===user._id?(
                <div className="flex items-center">
                    <input type="text" value={editableusername} onChange={e=>setusername(e.target.value)} className="w-full p-2 border rounded-lg"/>
                    <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><FaCheck></FaCheck></button>
                </div>
            ):(
                <div className="flex items-center">
                    {user.username}{" "}
                    <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                        <FaEdit className="ml-[1rem]"/>
                    </button>

                </div>
            )}</td>
            <td className="px-4 py-2">
                {editableUserId===user._id?(
                    <div className="flex items-center">
                        <input type="text" value={editableEmail} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded-lg"/>
                        <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><FaCheck/></button>
                    </div>
                ):(<div className="flex items-center">
                    {user.email}
                    <button onClick={()=>toggleEdit(user._id,user.username,user.email)}><FaEdit className="ml-[1rem]"/></button>
                </div>)}
            </td>
            <td className="px-4 py-2">
                {user.isAdmin ?(
                    <FaCheck sytle={{color:"green"}}/>
                ):(
                    <FaTimes style={{color:"red"}}/>
                ) }
            </td>
            <td className="px-4 py-2">
                {!user.isAdmin && (
                    <div className="flex">
                        <button onClick={()=>deleteHandler(user._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"><FaTrash/></button>
                    </div>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  )
}

export default Userlist
