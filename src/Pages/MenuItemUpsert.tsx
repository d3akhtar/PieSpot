import React, { useEffect, useState } from 'react'
import withAdmin from '../HOC/withAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { menuItemModel } from '../Interfaces';
import { useAddMenuItemMutation, useGetMenuItemByIdQuery, useUpdateMenuItemMutation } from '../apis/menuItemApi';
import { MainLoader } from '../Components/Layout/Page/CommonComponents';
import { inputHelper, toastNotify } from '../Helper';

function MenuItemUpsert() {
  const {menuItemId} = useParams();

  const [imageToBeStored,setImageToBeStored] = useState<any>();
  const [imageToBeDisplayed,setImageToBeDisplayed] = useState<string>("https://placehold.co/150x150/png");

  const [addMenuItem] = useAddMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

  const nav = useNavigate();

  const emptyMenuItem : menuItemModel = {
      id: 0,
      name: "",
      description: "",
      specialTag: "",
      category: "",
      price: 0,
      image: "https://placehold.co/150x150/png",
  }
  
  const {data,isLoading,isSuccess} = useGetMenuItemByIdQuery(parseInt(menuItemId!));
  const menuItem : menuItemModel = menuItemId !== undefined && !isLoading && isSuccess ? 
  (data.result):(emptyMenuItem);

  const [formData,setFormData] = useState<menuItemModel>(emptyMenuItem);
  useEffect(() => {
    setFormData(menuItem);
  },[isSuccess])

  const handleFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file){
      const imgType = file.type.split("/")[1];
      const validImageTypes = ["png", "jpg", "jpeg"];

      if (file.size > 1000 * 1024){
        setImageToBeStored("");
        toastNotify("File must be less than 1MB", "error");
        return;
      }
      else if (!validImageTypes.includes(imgType)){
        setImageToBeStored("");
        toastNotify("Image must be either a png, jpg, or jpeg", "error");
        return;
      }
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      console.log(file);
      setImageToBeStored(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToBeDisplayed(imgUrl);
      }
    }
  }
  const handleFormChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newState = inputHelper(e, formData);
    setFormData(newState);
  }
  const handleSubmitForm = async (e:React.FormEvent) =>{
      setIsSubmitting(true);
      e.preventDefault();
      
      if (!imageToBeStored && !isSuccess){
        toastNotify("Please upload an image!", "error");
        setIsSubmitting(false);
        return;
      }

      const bodyFormData = new FormData();
      bodyFormData.append("Name", formData.name);
      bodyFormData.append("Description", formData.description);
      bodyFormData.append("SpecialTag", formData.specialTag);
      bodyFormData.append("Category", formData.category);
      bodyFormData.append("Price", formData.price.toString());
      if (isSuccess && !imageToBeStored){
        bodyFormData.append("File", formData.image);
      }
      else{
        bodyFormData.append("File", imageToBeStored);
      }
      if (!isSuccess){
        bodyFormData.append("File", imageToBeStored);
      }

      console.log(formData);
      var response : any;
      if (isSuccess){
        bodyFormData.append("Id", formData.id.toString());
        response = await updateMenuItem(bodyFormData);
      }
      else{
        response = await addMenuItem(bodyFormData);
      }
      if (response.data.isSuccess){
        nav("/menuItems");
      }
      else{
        toastNotify(response.data.errorMessages[response.data.errorMessages.length - 1], "error");
      }

      setFormData(emptyMenuItem);
      setIsSubmitting(false);
  }

  return (
    !isLoading && !isSubmitting? 
    (<div className='row w-75 mt-5 p-5 border' style={{margin:"auto"}}>
    <div className='offset-md-2 col-10 col-md-4'>
      <span className='text-success h1'>{isSuccess ? ("Update"):("Add")} Product</span>
      <form onSubmit={handleSubmitForm} className='mt-5'>
        <input onChange={handleFormChange} name="name" className='form-control mt-3' value={formData.name} placeholder='Enter Name'></input>
        <textarea onChange={handleFormChange} name="description" className='form-control mt-3' value={formData.description} placeholder='Enter Description'></textarea>
        <input onChange={handleFormChange} name="specialTag" className='form-control mt-3' value={formData.specialTag} placeholder='Enter Special Tag'></input>
        <input onChange={handleFormChange} name="category" className='form-control mt-3' value={formData.category} placeholder='Enter Category'></input>
        <input onChange={handleFormChange} name="price" type='number' className='form-control mt-3' value={formData.price} placeholder='Enter Price'></input>
        <input onChange={handleFile} name="image" type='file' className='form-control mt-3'></input>
        <div className='m-5 d-flex justify-content-center'>
          <button className='btn btn-success w-50'>{isSuccess ? ("Update"):("Add")} Product</button>
        </div>
      </form>
    </div>
    <div className='col-10 col-md-4 ms-5'>
      <img className='w-100 mt-5 image-box' src={imageToBeDisplayed} style={{borderRadius: "5%"}}></img>
    </div>
  </div>):
  (<MainLoader/>)
  )
}

export default withAdmin(MenuItemUpsert)