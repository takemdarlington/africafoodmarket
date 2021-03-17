import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Button, Container, Row, Col, Table, Badge } from 'react-bootstrap';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return (
    <Container className="mt-5">
      {/* <div className="mt-5"> */}
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
      <Row className="mt-5">
          {/* <div className="placeorder"> */}
            <Col >
              <div className="placeorder-info">
                <div>
                  <h3 className="text-success">
                    Shipping
          </h3>
                  <div>
                    <h4>{cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},</h4>
                  </div>
                </div>
                <div>
                  <h3 className="text-success">Payment</h3>
                  <div>
                    <h4>  Payment Method: {cart.payment.paymentMethod}</h4>
                  </div>
                </div>
                <div>
                  <ul className="cart-list-container">
                    <li>

  <h4 className="text-success">Shopping Cart <Badge variant="success">{ cartItems.length}</Badge>
   </h4>

                      <div>
                        <h4>Price</h4>
                      </div>
                    </li>
                    {
                      cartItems.length === 0 ?
                        <div>
                      <h4>Cart is empty</h4>
          </div>
                        :
                        cartItems.map(item =>
                          <li>
                            <div className="cart-image">
                              <img src={item.image} alt="product" />
                            </div>
                            <div className="cart-name">
                              <div>
                                <Link to={"/product/" + item.product}>
                                  <h4>{item.name}</h4>
                                </Link>

                              </div>
                              <div>
                                <h4>Qty: {item.qty}</h4>
                              </div>
                            </div>
                            <div className="cart-price">
                            €{item.price}
                            </div>
                          </li>
                        )
                    }
                  </ul>
                </div>


              </div>
            </Col>
            <Col >
              <div className="placeorder-action">
                

                  
                    
                      <Button className="full-width" variant="outline-success" size="lg" onClick={placeOrderHandler} >Place Order</Button>
                    
              
                    
                      <h3 className="text-success text-center mt-3">Order Summary</h3>
            <hr></hr>

              <Table striped  hover variant="light" >
               
                  <thead >
                    <tr>


                  <th> <h4>Item</h4></th>
                  <th><h4>Amount</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                  <td><h4>Item</h4></td>
                  <td> <h4>€{itemsPrice}</h4></td>

                    </tr>
                    <tr>
                  <td><h4>Shipping</h4></td>
                  <td><h4>€{shippingPrice}</h4></td>

                    </tr>
                    <tr>
                  <td><h4>Tax</h4></td>
                  <td><h4>€{taxPrice}</h4></td>

                    </tr>
                    <tr className="text-danger">
                      <td ><h3><bold >Order Total</bold></h3></td>
                      <td><h3><bold >€{totalPrice} </bold></h3></td>

                    </tr>

                  </tbody>
               
              </Table>


              </div>
            </Col>

          {/* </div> */}
      </Row>
      {/* </div> */}
    </Container>
  )

}

export default PlaceOrderScreen;