import React, { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useGetMenuItemByIdQuery } from '../apis/menuItemApi';
import { apiResponseModel, menuItemModel, userModel } from '../Interfaces';
import { useUpdateShoppingCartMutation } from '../apis/shoppingCartApi';
import { MainLoader, MiniLoader } from '../Components/Layout/Page/CommonComponents';
import { toastNotify } from '../Helper';
import { useSelector } from 'react-redux';

// user id test: 7bbacbf3-ae47-4719-8db9-119e7d02082b

function MenuItemDetails() {

    const {menuItemId} = useParams();
    var menuItemIdString:string;
    if (menuItemId !== undefined){
        menuItemIdString = menuItemId as string;
    }
    const {data,isLoading} = useGetMenuItemByIdQuery(menuItemId);
    const [quantity,setQuantity] = useState(1);
    const [isAddingToCart,setAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppingCartMutation();

    const loggedInUser : userModel = useSelector((state : any) => state.userAuthStore);

    const handleIncrement = () => {
        setQuantity(p => {
            return p + 1;
        })
    }
    const handleDecrement = () => {
        setQuantity(p => {
            return p == 1 ? 1:p-1
        })
    }
    const handleAddToCart = async (menuItemId:number) => {
        setAddingToCart(true);

        const response : apiResponseModel = await updateShoppingCart({
            userId: loggedInUser.id, 
            menuItemId: menuItemId, 
            updateQuantityBy: quantity
        });
        if (response.data && response.data.isSuccess){
            toastNotify("Item added successfully!");
        }

        setAddingToCart(false);
    } 

    if (isLoading){
        return <div><MainLoader/></div>
    }
    else{
        //(data.result);
        const menuItem: menuItemModel = data.result;
        return (
            <div className='row p-5' style={{maxWidth: "100%", overflowX: "hidden" }}>
                <div className='offset-md-1 col-md-5 col-10'>
                    <span className='row text-success fs-4' style={{fontWeight:"bold"}}>{menuItem.name}</span>
                    <div className='row'>
                        <span className='col-12 col-md-2 text-white fs-6 badge bg-dark'>{menuItem.category}</span>
                        <span className='col-12 col-md-2 fs-6' style={{fontWeight:"bold"}}>{menuItem.specialTag}</span>
                    </div>
                    <span className='row fs-6 mt-2  '>{menuItem.description}</span>
                    <div className='row'>
                        <span className='col-12 col-md-2 fs-4' style={{fontWeight:"bold"}}>${menuItem.price}</span>
                        <span className='col-12 col-md-2 fs-4' style={{border:"1px solid black", borderRadius:"25px"}}>
                            <div className='row'>
                                <span style={{cursor: "pointer", border:"none", fontWeight:"bold"}} onClick={handleDecrement} className='btn text-center col-9 col-md-2'>-</span>
                                <span className='col-9 offset-md-1 col-md-5 text-center' style={{fontWeight:"bold"}}>{quantity}</span>
                                <span style={{cursor: "pointer", border:"none",fontWeight:"bold"}} onClick={handleIncrement} className='btn text-center col-9 col-md-2'>+</span>
                            </div>
                        </span>
                    </div>
                    <div className='row mt-5'>
                        {isAddingToCart ? 
                        (<button disabled className='col-12 col-md-4 btn btn-success' style={{fontWeight:"bold"}}><MiniLoader size={50}/></button>):
                        (<button onClick={() => {handleAddToCart(parseInt(menuItemIdString))}} className='col-12 col-md-4 btn btn-success' style={{fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center"}}>Add To Cart</button>)}
                        <Link className='btn btn-secondary col-12 col-md-4 offset-md-1' to="/">
                            Back To Home
                        </Link>
                    </div>
                </div>
                <div className='col-md-5 col-10 text-white'>
                    <img className='w-75 m-5 image-box' src={menuItem.image}style={{borderRadius: "50%", border:"5px solid black"}}></img>
                </div>
            </div>
        )
    }
}

export default MenuItemDetails