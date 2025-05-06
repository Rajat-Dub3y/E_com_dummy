import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice"
import AdminMenu from "./AdminMenu"


const OrderList = () => {

    const {data:orders,isLoading,error}=useGetOrdersQuery();



  return (
    <div>
        {isLoading ?(<Loader />):error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>):(
            <table className="container mx-auto">
                <AdminMenu />
                <thead className="w-full border">
                    <tr className="mb-[5rem]">
                        <th className="text-left pl-1">Items</th>
                        <th className="text-left pl-1">ID</th>
                        <th className="text-left pl-1">User</th>
                        <th className="text-left pl-1">Date</th>
                        <th className="text-left pl-1">Total</th>
                        <th className="text-left pl-1">Paid</th>
                        <th className="text-left pl-1">Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                        <tr key={order._id}>
                            <td>
                                <img src={order.orderItems[0].image} alt="" className="w-[5rem] pt-4" />
                            </td>
                            <td>{order._id}</td>
                            <td>{order.user ? order.user.username : "N/A"}</td>
                            <td>{order.crearedAt ? order.crearedAt.substring(0,10):"N/A"}</td>
                            <td>$ {order.totalPrice}</td>
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
                            <td>
                                <Link to={`/order/${order._id}`} >More</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default OrderList