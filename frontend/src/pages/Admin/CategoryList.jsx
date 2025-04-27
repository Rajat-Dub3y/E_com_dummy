import { useState } from "react"
import {useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery} from "../../redux/api/categoryApiSlice.js"
import { toast } from "react-toastify"
import CategoryForm from "../../components/CategoryForm.jsx"
import Model from "../../components/Model.jsx"
import AdminMenu from "./AdminMenu.jsx"

const CategoryList = () => {


  const {data:categories}=useFetchCategoriesQuery();
  const [name,setname]=useState("")
  const [selectedCat,setCat]=useState(null)
  const [updateName,setUpdateName]=useState("")
  const [modalVisible,setModalVisiblle]=useState(false)

  const [createCat]=useCreateCategoryMutation()
  const [updateCat]=useUpdateCategoryMutation()
  const [deleteCat]=useDeleteCategoryMutation()

  const handleCreateCategory=async(e)=>{
    e.preventDefault()
    if(!name){
      toast.error("category name is required")
    }
    try{
      const result=await createCat({name}).unwrap()
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success(`${result.name} is created`)
      }
    }catch(error){
      console.log(error)
      toast.error("create catergory failed")
    }
  }

  const handleUpdateCat=async(e)=>{
    e.preventDefault()
    if(!updateName){
      toast.error("Category name is required")
    }
    try{
      const result=await updateCat({categoryId:selectedCat._id,updatedCat:{name:updateName}}).unwrap()
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success("Updated")
        setCat(null)
        setUpdateName("")
        setModalVisiblle(false)
      }
    }catch(error){
      console.log(error)
    }

  }

  const handleDelete=async()=>{
    try{
      console.log(selectedCat._id )
      const result=await deleteCat(selectedCat._id).unwrap()
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success(`${result.name} is deeleted`)
        setCat(null)
        setModalVisiblle(false)
      }
    }catch(error){
      console.log(error)
      toast.error("deletion failed")
    }
  }


  return (
    <div className ="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm value={name} setvalue={setname} handleSubmit={handleCreateCategory} />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category)=>(
            <div key={category._id}>
              <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-pink-500 focus:ring-opacity-50" onClick={()=>{setModalVisiblle(true) 
                setCat(category)
                setUpdateName(category.name)
              }}>{category.name}</button>
            </div>
          ))}
        </div>
        <Model isOpen={modalVisible} onClose={()=>setModalVisiblle(false)} >
          <CategoryForm value={updateName} setvalue={(value)=>setUpdateName(value)} handleSubmit={handleUpdateCat} buttonText="Update" handleDelete={handleDelete}/>
        </Model>
      </div>
    </div>
  )
}

export default CategoryList