import { Route, Routes } from 'react-router-dom';
import {Header,Footer} from '../Components/Layout/';
import {AccessDenied, AllOrdersList, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemDetails, MenuItemUpsert, NotFound, OrderConfirmed, OrdersList, Register, ShoppingCart} from '../Pages/';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartByUserIdQuery } from '../apis/shoppingCartApi';
import { setShoppingCart } from '../storage/redux/shoppingCartSlice';
import { userModel } from '../Interfaces';
import Payment from '../Pages/Payment';
import OrderDetails from '../Pages/OrderDetails';
import MenuItemsList from '../Pages/MenuItemsList';

function App() {

  const dispatch = useDispatch();
  const loggedInUser : userModel = useSelector((state : any ) => state.userAuthStore);
  const {data,isLoading} = useGetShoppingCartByUserIdQuery(loggedInUser.id);

  useEffect(() => {
    if (!isLoading){
      if (data.result.cartItems){
        dispatch(setShoppingCart(data.result?.cartItems));
      }
      else{
        dispatch(setShoppingCart([]));
      }
    }
  }, [data]);

  return (
    <div className="App">
      <Header/>
      <div className='pb-5'>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/authentication" element={<AuthenticationTest/>}></Route>
          <Route path="/authorization" element={<AuthenticationTestAdmin/>}></Route>
          <Route path="/accessDenied" element={<AccessDenied/>}></Route>
          <Route path="/payment" element={<Payment/>}></Route>
          <Route path="/order/orderConfirmed/:orderHeaderId" element={<OrderConfirmed/>}></Route>
          <Route path="/order/myOrders/" element={<OrdersList/>}></Route>
          <Route path="/order/orderDetails/:orderHeaderID" element={<OrderDetails/>}></Route>
          <Route path="/order/allOrders" element={<AllOrdersList/>}></Route>
          <Route path="/menuItems" element={<MenuItemsList/>}></Route>
          <Route path="/menuItems/upsert/:menuItemId" element={<MenuItemUpsert/>}></Route>
          <Route path="/menuItems/upsert/" element={<MenuItemUpsert/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
