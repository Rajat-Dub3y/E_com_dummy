import { useState } from "react"
import { useNavigate } from "react-router"
import {useCreateProductMutation,useUploadProductImgMutation} from "../../redux/api/productApiSlice.js"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu.jsx"


const ProductList = () => {

    const [image,setImage]=useState("")
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [quantity, setQuantity] = useState("");
    const [brand,setBrand]=useState("")
    const [stock,setStock]=useState(0)
    const [imageUrl,setImageUrl]=useState(null)
    const navigate=useNavigate()
    const [UploadProductImage]=useUploadProductImgMutation()
    const [createProduct]=useCreateProductMutation()
    const {data:categories}=useFetchCategoriesQuery()


    const uploadHandler=async(e)=>{
        const formData=new FormData()
        formData.append("image",e.target.files[0])
        try{
            const res=await UploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)
        }catch(error){
            toast.error(error?.data?.message||error.error)
        }
    }


    const HandleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const productData=new FormData()
            productData.append("image",image)
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("category",category)
            productData.append("quantity",quantity)
            productData.append("brand",brand)
            productData.append("countInStock",stock)

            const {data}=await createProduct(productData)
            if(data?.error){
                toast.error("Creation error")
                console.log(data.error)
            }else{
                toast.success(`${data.name} is created`)
                navigate("/")
            }
        } catch (error) {
            console.error(error)
            toast.error("Product creation failed. Try Again")
        }
    }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">Create Product</div>
                {imageUrl && (
                    <div className="text-center">
                        <img src={imageUrl} alt="Product" className="block mx-auto max-h-[200]" />
                    </div>
                )}
                <div className="mb-3">
                    <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                        {image ? image.name :"Upload Image"}
                        <input type="file" name="image" accept="image/*" onChange={uploadHandler} className={!image ? 'hidden' : "text-black"} />
                    </label>
                </div>
            </div>
            <div className="p-3">
                <div className="flex flex-wrap">
                    <div className="one">
                        <label htmlFor="name" >Name</label><br />
                        <input type="text" className="p-4 mb-3 mr-20 w-[30rem] border rounded-lg bg-white text-black" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="two">
                        <label htmlFor="price">Price</label><br />
                        <input type="number" className="p-4 mb-3  w-[30rem] border rounded-lg bg-white text-black" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="one">
                        <label htmlFor="quantity" >Quantity</label><br />
                        <input type="number" className="p-4 mb-3 mr-20 w-[30rem] border rounded-lg bg-white text-black" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                    </div>
                    <div className="two">
                        <label htmlFor="brand">Brand</label><br />
                        <input type="text" className="p-4 mb-3  w-[30rem] border rounded-lg bg-white text-black" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                    </div>
                </div>
                <label htmlFor="" className="my-5">Description</label>
                <textarea type="text" className="p-2 mb-3 bg-white border rounded-lg w-[95%] text-black" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="name block" >Count in Stock</label>
                        <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black" value={stock} onChange={e=>setStock(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Category</label>
                        <select placeholder="Choose category" className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black" onChange={e=>setCategory(e.target.value)} >
                            <option value="">select</option>
                            {categories?.map((c)=>(
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={HandleSubmit} className="py-4 px-10 mt-5 rounded-lg font-bold bg-pink-600">submit</button>
            </div>
        </div>
    </div>
  )
}



export default ProductList
