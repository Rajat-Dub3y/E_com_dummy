import {useNavigate,useParams} from "react-router-dom"
import { useUpdateProductMutation,useDeleteProductMutation,useGetProductByIdQuery,useUploadProductImgMutation } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import AdminMenu from "./AdminMenu"
import {toast} from "react-toastify"
import { useEffect, useState } from "react"


const Productupdate = () => {

  const params=useParams()

  const {data:productData}=useGetProductByIdQuery(params._id)

  const [image,setimage]=useState(productData?.image || "")
  const [quantity,setquantity]=useState(productData?.quantity || "")
  const [name,setname]=useState(productData?.name || "")
  const [description,setDescription]=useState(productData?.description || "")
  const [price,setprice]=useState(productData?.price || "")
  const [category,setcategory]=useState(productData?.category || "")
  const [brand,setbrand]=useState(productData?.brand || "")
  const [stock,setstock]=useState(productData?.countInStock || "")

  const navigate=useNavigate()

  const {data:categories=[]}=useFetchCategoriesQuery()
  const [uploadProductImg]=useUploadProductImgMutation()
  const [updateProduct]=useUpdateProductMutation()
  const [deleteProduct]=useDeleteProductMutation()

  const HandleUpdate=async(e)=>{
    e.preventDefault()
    try {
        const formData=new FormData()
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("image",image)
        formData.append("brand", brand);
        formData.append("countInStock", stock);

        const {data}=await updateProduct({productId:params._id,formData})
        if(data?.error){
            toast.error("Update error")
            console.log(data.error)
        }else{
            toast.success(`${data.name} is updated`)
            navigate("/admin/allproduct")
        }
    } catch (error) {
        console.error(error)
        toast.error("Product updation failed. Try Again")
    }
}

  const HandleDelete=async()=>{
    try {
      let answer=window.confirm("Are you sure you want to delete this product")
      if(!answer) return ;
      const {data}=await deleteProduct(params._id)
      toast.success(`${data.name} is deleted`)
      navigate("/admin/allproduct")
    } catch (error) {
      console.log(error)
      toast.error("deletion failed")
    }
  }

  const uploadHandler=async(e)=>{
    const formData=new FormData()
    formData.append("image",e.target.files[0])
    try{
        const res=await uploadProductImg(formData).unwrap()
        toast.success(res.message)
        setimage(res.image)
    }catch(error){
        toast.error(error?.data?.message||error.error)
    }
}


  useEffect(()=>{
    if(productData && productData._id){
      setname(productData.name)
      setDescription(productData.description)
      setbrand(productData.brand)
      setprice(productData.price)
      setquantity(productData.quantity)
      setcategory(productData.categories?._id)
      setimage(productData.image)
      setstock(productData.countInStock)
    }
  },[productData])

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
            <div className="h-12">Create Product</div>
            {image && (
                <div className="text-center">
                    <img src={image} alt="Product" className="block mx-auto max-h-[200]" />
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
                    <input type="text" className="p-4 mb-3 mr-20 w-[30rem] border rounded-lg bg-white text-black" value={name} onChange={(e)=>setname(e.target.value)}/>
                </div>
                <div className="two">
                    <label htmlFor="price">Price</label><br />
                    <input type="number" className="p-4 mb-3  w-[30rem] border rounded-lg bg-white text-black" value={price} onChange={(e)=>setprice(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="one">
                    <label htmlFor="quantity" >Quantity</label><br />
                    <input type="number" className="p-4 mb-3 mr-20 w-[30rem] border rounded-lg bg-white text-black" value={quantity} onChange={(e)=>setquantity(e.target.value)}/>
                </div>
                <div className="two">
                    <label htmlFor="brand">Brand</label><br />
                    <input type="text" className="p-4 mb-3  w-[30rem] border rounded-lg bg-white text-black" value={brand} onChange={(e)=>setbrand(e.target.value)}/>
                </div>
            </div>
            <label htmlFor="" className="my-5">Description</label>
            <textarea type="text" className="p-2 mb-3 bg-white border rounded-lg w-[95%] text-black" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="name block" >Count in Stock</label>
                    <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black" value={stock} onChange={e=>setstock(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <select placeholder="Choose category" className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black" onChange={e=>setcategory(e.target.value)} >
                        <option value="">select</option>
                        {categories?.map((c)=>(
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
              <button onClick={HandleUpdate} className="py-4 px-10 mt-5 rounded-lg font-bold bg-green-600">update</button>
              <button onClick={HandleDelete} className="py-4 px-10 mt-5 rounded-lg font-bold bg-red-600">Delete</button>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default Productupdate