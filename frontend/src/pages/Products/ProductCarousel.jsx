import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment"
import { FaBox,FaClock,FaShoppingCart,FaStar,FaStore } from "react-icons/fa"



const ProductCarousel = () => {

    const {data:products,isLoading,error}=useGetTopProductsQuery()

    const setting={
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slideToScroll:1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:3000,
    }


  return (
    <div>
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ?(
                <Message variant="danger">{error?.data?.message || error.message}</Message>
            ):(
                <Slider {...setting} className="xl:w-[30rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">
                    {
                        products.map(({image,_id,name,price,description,brand,createdAt,numReviews,rating,quantity,countInStock})=>(
                            <div key={_id}>
                                <img src={image} alt={name} className="w-[100%] rounded-lg object-cover h-[30rem] " />
                                <div className="ml-4 mt-4 flex justify-between w-[30rem]">
                                    <div className="one">
                                        <h2>{name}</h2>
                                        <p>$ {price}</p> <br/> <br/>
                                        <p className="w-[15rem]">{description}</p>
                                    </div>
                                    <div className="flex justify-between w-[30rem]">
                                        <div className="one">
                                            <h1 className="flex items-center mb-6">
                                                <FaStore className="mr-2 text-black" /> Brand:{brand}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaClock className="mr-2 text-black" /> Added:{" "}{moment(createdAt).fromNow()}
                                            </h1>
                                            <h1 className="flex items-center mb-6">
                                                <FaStar className="mr-2 text-black" /> Reviews:{" "}
                                                {numReviews}
                                            </h1>
                                        </div>
                                        <div className="two">
                                            <div className="flex items-center mb-6 w-[5rem]">
                                                <FaStar className="mr-2 text-black "/>
                                                Ratings:{Math.round(rating)}
                                            </div>
                                            <div className="flex items-center mb-6 w-[5rem]">
                                                <FaShoppingCart className="mr-2 text-black "/>
                                                quantity:{Math.round(quantity)}
                                            </div>
                                            <div className="flex items-center mb-6 w-[5rem]">
                                                <FaBox className="mr-2 text-black "/>
                                                Stock:{Math.round(countInStock)}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            )}
        </div>
    </div>
  )
}

export default ProductCarousel