import React, { useState } from 'react';
import "./Navigation.css";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from '../../redux/api/userApiSlice';
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from '../Products/FavoriteCount';

const Navigation = () => {
    
    
    const {userInfo} = useSelector(state => state.auth);
    const {cartItems}=useSelector((state)=>state.cart)

    
    const [dropdown, setDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [logoutApiCall] = useLogoutMutation();


    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div 
            style={{ zIndex: 999 }} 
            className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
        >
            <div>
                <div className="flex flex-col justify-center space-y-4">
                    <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineHome className="mr-3 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Home</span>
                    </Link>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShopping className="mr-3 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Shop</span>{" "}
                    </Link>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mr-3 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>
                        <div className="absolute top-9">
                            {cartItems.length>0 && (
                                <span>
                                    <span className="px-1 py-0 text-white bg-pink-500 rounded-full">
                                        {cartItems.reduce((a,c)=>a+c.qty,0)}
                                    </span>
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                    <Link to="/favorite" className="flex items-center transition-transform transform hover:translate-x-2">
                        <FaHeart className="mr-3 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
                        <FavoriteCount />
                    </Link>
                </div>
            </div>

            <div className="relative">
                <button onClick={() => setDropdown(prev => !prev)} className="flex items-center text-gray-800 focus:outline-none">
                {userInfo ? (<span className='text-white'>{userInfo.username}</span>) : <span className="text-white">Login</span>}
                    {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdown ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdown && userInfo && (
            <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20":"-top-80"}`}>
                {userInfo.isAdmin && (
                    <>
                        <li>
                            <Link to="/admin/dashboard" className="black px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/admin/productlist" className="black px-4 py-2 hover:bg-gray-100">Products</Link>
                        </li>
                        <li>
                            <Link to="/admin/categorylist" className="black px-4 py-2 hover:bg-gray-100">Categaory</Link>
                        </li>
                        <li>
                            <Link to="/admin/orderlist" className="black px-4 py-2 hover:bg-gray-100">Order</Link>
                        </li>
                        <li>
                            <Link to="/admin/userlist" className="black px-4 py-2 hover:bg-gray-100">Users</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to="/profile" className="black px-4 py-2 ">Profile</Link>
                </li>
                <li>
                    <button  onClick={logoutHandler} className="black px-4 py-2">Logout</button>
                </li>
            </ul>
        )}
        <ul>
            {!userInfo && (
                <ul>
                    <li>
                        <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineLogin className="mr-3 mt-[3rem]" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Login</span>
                        </Link>
                    </li>
                </ul>
            )}
        </ul>
    </div>
</div>
    );
};

export default Navigation;