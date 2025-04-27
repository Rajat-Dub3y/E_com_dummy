import { useState } from "react"
import { NavLink } from "react-router"
import {FaTimes} from "react-icons/fa"

const AdminMenu = () => {

    const [isMenu,setMenu]=useState(false)

    const toggleMenu=()=>{
        setMenu(!isMenu)
    }


  return (
    <div>
        <button className={`${isMenu ? "top-2 right-2 " :"top-5 right-7 " } bg-white p-2 fixed rounded-lg`} onClick={toggleMenu}>
            {isMenu ? (
                <FaTimes color="black"/>
            ):(
                <>
                    <div className="w-6 h-0.5 bg-black my-1"></div>
                    <div className="w-6 h-0.5 bg-black my-1"></div>
                    <div className="w-6 h-0.5 bg-black my-1"></div>
                    <div className="w-6 h-0.5 bg-black my-1"></div>
                </>
            )}
        </button>
        {isMenu && (
            <section className="bg-white p-4 fixed right-7 top-5">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/dashboard" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>Admin Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/categorylist" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>Create Category</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/productlist" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>Create Product</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/allproduct" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>All Product</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/userlist" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>Manage User</NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[2E2D2D] rounded-sm" to="/admin/dashboard" style={({isActive})=>({color :isActive ? "greenyellow" : "black"})}>Manage order</NavLink>
                    </li>
                </ul>
            </section>
        )}
    </div>
  )
}

export default AdminMenu