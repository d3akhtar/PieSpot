import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { cartItemModel, userModel } from '../../Interfaces';
import { setLoggedInUser } from '../../storage/redux/userAuthSlice';
import { setShoppingCart } from '../../storage/redux/shoppingCartSlice';
import { SD_Roles } from '../../Utilities/staticDetails';
let logo = require("../../Assets/Images/piespot.png")

function Header() {
  const cartItems: cartItemModel[] = useSelector((state:any) => state.shoppingCartStore.cartItems);
  const loggedInUser : userModel = useSelector((state:any) => state.userAuthStore);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({
      fullName: "",
      id: "",
      email: "",
      role: "",
    }))
    dispatch(setShoppingCart([]));
  }
  
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-dark p-3">
    <NavLink className="nav-link text-white" to="/">  
      <img src={logo} style={{height: "40px"}} className='m-1'/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto w-100">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/">Home <span className="sr-only"></span></NavLink>
        </li>
        {loggedInUser.role == SD_Roles.ADMIN ? 
        (<li className="nav-item dropdown">
        <a className="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin Panel
        </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NavLink className="dropdown-item" to="/order/myOrders">My Orders</NavLink>
            <NavLink className="dropdown-item" to="/order/allOrders">All Orders</NavLink>
            <NavLink className="dropdown-item" to="/menuItems">Menu Items</NavLink>
          </div>
        </li>):
        (<li className="nav-item">
          <NavLink className="nav-link text-white" to="/order/myOrders">Orders<span className="sr-only"></span></NavLink>
        </li>)}
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/shoppingCart">
            <i className='bi bi-cart'>
              {cartItems.length > 0 ? 
              (
              <span className='badge bg-light text-dark' 
              style={{borderRadius:"50%", scale:"80%",position:"relative",top:"5px",right:"10px"}}>
              {cartItems.length}
              </span>
              ):
              (
                <></>
              )}
              </i><span className="sr-only"></span></NavLink>
        </li>
        <div className='d-flex my-lg-0' style={{marginRight:"auto"}}>
          
        </div>
          {loggedInUser.id != "" ? 
          (
          <div className="my-2 my-lg-0 d-flex justify-content-right">
            <li className='nav-item pt-1 text-white d-flex align-items-center me-3' style={{fontWeight:"bolder"}}>
              Welcome, {loggedInUser.fullName}
            </li>
            <li className='nav-item pt-1'>
              <button
              onClick={handleLogout}
              className='btn btn-success btn-outlined rounded-pill text-white mx-2 my-2 my-sm-0'
              style={{
                border: "none",
                height: "40px",
                width: "100px"
              }}
              >Logout</button>
            </li>
          </div>
          ):
          (
          <div className="my-2 my-lg-0 d-flex justify-content-right">
            <NavLink to="/register" className='d-flex justify-content-center align-items-center'>
            <li className='nav-item pt-1 mx-3 text-secondary text-center'>
              <span style={{textDecoration:"none"}}>Register</span>
            </li>
            </NavLink>
            <NavLink to='/login'>
              <li className='nav-item pt-1'>
                <button
                className='btn btn-success btn-outlined rounded-pill text-white mx-2 my-2 my-sm-0'
                style={{
                  border: "none",
                  height: "40px",
                  width: "100px"
                }}
                >Login</button>
              </li>
            </NavLink>
          </div>
          )}
      </ul>
    </div>
  </nav></div>
  )
}

export default Header