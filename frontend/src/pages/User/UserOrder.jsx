import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetMyOrderQuery } from "../../redux/api/orderApiSlice"



const UserOrder = () => {

    const {data:orders,isLoading,error}=useGetMyOrderQuery();

  return (
    <div>
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
            {isLoading ? (<Loader />) : error ?(
                <Message variant="danger" >{error?.data?.error || error.error}</Message>
            ):(
                <table className="w-full justify-between">
                    <thead>
                        <tr>
                            <td className="py-2">Image</td>
                            <td className="py-2">ID</td>
                            <td className="py-2">Date</td>
                            <td className="py-2">Total</td>
                            <td className="py-2">Paid</td>
                            <td className="py-2">Delivered</td>
                            <td className="py-2">Image</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id}>
                                <img src={order.orderItems[0].image} alt={order.user} className="w-[6rem] mb-5" />
                                <td className="py-2">{order._id}</td>
                                <td className="py-2">{order.createdAt.substring(0,10)}</td>
                                <td className="py-2">{order.totalPrice}</td>
                                <td className="py-2">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                                    ):(
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                    </td>
                                <td className="px-2 py-2">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Comeplted
                                        </p>
                                    ):(
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                </td>
                                <td className="px-2 py-2">
                                    <Link to={`/order/${order._id}`}>
                                        <button className="bg-pink-400 text-back py-2 px-3 rounded">
                                            View Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  )
}

export default UserOrder