import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import UsersScreen from './screens/UsersScreen';

import { Button, Row, Container } from 'react-bootstrap';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
    <Container>
      {/* <div className="grid-container"> */}
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Africa FoodMarket</Link>
          </div>
          <div className="header-links">
           <a href="/cart">Cart</a>
            {userInfo ? (
             <Link to="/profile">{userInfo.name}</Link>
          ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
               <h4>
                  <a href="#">Admin</a></h4>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orders">Orders</Link>
                      <Link to="/products">Products</Link>
                      <Link to="/users">Users</Link>

                    </li>
                  </ul>
               
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar" style={{zIndex: 10}}>
          <h3 className="text-center text-success mt-4">Shopping Categories</h3>
          <Button variant="dark" className="sidebar-close-button" onClick={closeMenu}>
            x
          </Button>
          <Container>
            <hr></hr>
            <Row className="ml-5 mt-5 ">
              <h4 className="text-dark"><Link to="/category/tins">Tins</Link></h4>
            </Row>
            <hr></hr><hr></hr>
            <Row className="ml-5 mt-5">
              <h4 className="text-dark"><Link to="/category/breverage">Breverage</Link></h4>
            </Row>
            <hr></hr>
          </Container>
         
        </aside>
        <main className="main">

          <div className="content container">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/users" component={UsersScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        
        <footer className="footer">
          
        <a target="_blank" href="https://wa.me/37064350423" id="whatsapp"><img width="75px" src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" /></a><br/>
        
        All right reserved.
        
        </footer>
        </Container>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
