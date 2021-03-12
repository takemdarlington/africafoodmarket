import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { Button, Container, Row, Col, Table, Badge, Spinner } from 'react-bootstrap';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div className="text-center"><Spinner animation="border" variant="primary" /></div> : error ? <div>{error}</div> :

    <Container className="mt-5" >
      <div>
        <div className="placeorder">
          <div className="placeorder-info">
            <div>
              <h3 className="text-success">
                Shipping
          </h3>
              <div>
                <h4>{order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},</h4>
          </div>
              <div>
                <h4> {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}</h4>
              </div>
            </div>
            <div>
              <h3 className="text-success">Payment</h3>
              <div>
                <h4>Payment Method: {order.payment.paymentMethod}</h4>              </div>
              <div>
                <h4> {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}</h4>
              </div>
            </div>
            <div>
              <ul className="cart-list-container">
                <li>
                  <h3 className="text-success">
                    Shopping Cart <Badge variant="success"> {order.orderItems.length}</Badge>
          </h3>
                  <div>
                    <h3>Price</h3>
          </div>
                </li>
                {
                  order.orderItems.length === 0 ?
                    <div>
                      <h3>Cart is empty</h3>
          </div>
                    :
                    order.orderItems.map(item =>
                      <li key={item._id}>
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
                          ${item.price}
                        </div>
                      </li>
                    )
                }
              </ul>
            </div>


          </div>
          <div className="placeorder-action">
            <ul>
              <li className="placeorder-actions-payment">
                {loadingPay && <div>Finishing Payment...</div>}
                {!order.isPaid &&
                  <PaypalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment} />
                }
              </li>
              </ul>
                <h3 className="text-success text-center">Order Summary</h3>
                <hr></hr>
            

            <Table striped hover variant="light" >

              <thead >
                <tr>


                  <th> <h4>Item</h4></th>
                  <th><h4>Amount</h4></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><h4>Item</h4></td>
                  <td> <h4>${order.itemsPrice}</h4></td>

                </tr>
                <tr>
                  <td><h4>Shipping</h4></td>
                  <td><h4>${order.shippingPrice}</h4></td>

                </tr>
                <tr>
                  <td><h4>Tax</h4></td>
                  <td><h4>${order.taxPrice}</h4></td>

                </tr>
                <tr className="text-danger">
                  <td ><h3><bold >Order Total</bold></h3></td>
                  <td><h3><bold >${order.totalPrice} </bold></h3></td>

                </tr>

              </tbody>

            </Table>
           



          </div>

        </div>
      </div>
    </Container>

}

export default OrderScreen;