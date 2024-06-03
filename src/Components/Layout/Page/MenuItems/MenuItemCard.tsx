import React, { useState } from 'react'
import { apiResponseModel, menuItemModel, userModel } from '../../../../Interfaces'
import { Link } from 'react-router-dom'
import { useUpdateShoppingCartMutation } from '../../../../apis/shoppingCartApi';
import { MiniLoader } from '../CommonComponents';
import { toastNotify } from '../../../../Helper';
import { useSelector } from 'react-redux';

interface Props{
    menuItem: menuItemModel,
}

function MenuItemCard(props: Props) {

    const [updateShoppingCart] = useUpdateShoppingCartMutation();
    const [addingToCart,setIsAddingToCart] = useState<boolean>(false);
    const loggedInUser : userModel = useSelector((state : any) => state.userAuthStore);

    const handleAddToCart = async (menuItemId:number) => {
        setIsAddingToCart(true);

        if (loggedInUser.id != ""){
            const response : apiResponseModel = await updateShoppingCart
            ({userId:loggedInUser.id,menuItemId: menuItemId, updateQuantityBy: 1});

            if (response.data && response.data.isSuccess){
                toastNotify("Item added successfully!");
            }
        }
        else{
            toastNotify("You must be logged in to add to shopping cart!","error");
        }

        setIsAddingToCart(false);
    }

  return (
        <div className='col-md-4 col-12 p-4'>
            <div className='card' style={{boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)"}}>
                <div className='card-body pt-2'>
                    <div className='row col-10 offset-1 p-4'>
                        <Link to={`/menuItemDetails/${props.menuItem.id}`}>
                            <img className='w-100 mt-5 image-box' src={props.menuItem.image} style={{borderRadius: "50%"}}></img>
                        </Link>
                    </div>
                    {props.menuItem.specialTag && props.menuItem.specialTag.length > 0 && (<i 
                    className='bi bi-star btn btn-success' 
                    style={{position:"absolute",
                            top: "15px",
                            left: "15px",
                            padding: "5px 10px",
                            borderRadius: "3px",
                            outline: "none !important",
                            cursor: "pointer"
                    }}>
                        <span className='ms-1'>{props.menuItem.specialTag}</span>
                    </i>)}
                    {addingToCart? 
                    (
                    <div style={{position:"absolute",top: "15px",right: "15px",}}><MiniLoader/></div>):(
                        <i
                        onClick={() => handleAddToCart(props.menuItem.id)} 
                        className='bi bi-cart btn btn-outline-danger' 
                        style={{position:"absolute",
                                top: "15px",
                                right: "15px",
                                padding: "5px 10px",
                                borderRadius: "3px",
                                outline: "none !important",
                                cursor: "pointer"
                        }}>
                        </i>
                    )}
                    
                    <div className='text-center'>
                        <Link to={`/menuItemDetails/${props.menuItem.id}`} style={{textDecoration:"none"}}>
                            <p className='card-title m-0 text-success fs-3'>{props.menuItem.name}</p>
                        </Link>
                        <p className='badge bg-secondary'>{props.menuItem.category}</p>
                    </div>
                    <p className='card-text' style={{textAlign:"center"}}>
                        {props.menuItem.description}
                    </p>
                    <div className='row text-center'>
                        <h4>${props.menuItem.price}</h4>
                    </div>
                </div>
            </div>
        </div>  
        )
}

export default MenuItemCard