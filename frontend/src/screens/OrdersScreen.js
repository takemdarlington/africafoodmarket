import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { Table, Container, Spinner, Button } from 'react-bootstrap';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div><Spinner animation="border" variant="primary" /></div> :
    <Container>
      <div className="content content-margined">

        <div className="order-header ">
          <h3 className="text-success mt-3 mb-3">Orders</h3>
        </div>
        <div className="order-list">

          <Table className="table" striped hover bordered>
            <thead>
              <tr>
                <th> <h4>ID</h4></th>
                <th><h4>DATE</h4></th>
                <th><h4>TOTAL</h4></th>
                <th><h4>USER</h4></th>
                <th><h4>EMAIL</h4></th>
                <th><h4>PAYMENT METHOD</h4></th>
                <th><h4>PAID</h4></th>
                <th><h4>PAID AT</h4></th>
                <th><h4>DELIVERED</h4></th>
                <th><h4>DELIVERED AT</h4></th>
                <th><h4>ACTIONS</h4></th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 && orders.map(order => (<tr key={order._id}>
                <td> <h5>{order._id}</h5></td>
                <td><h5>{order.createdAt}</h5></td>
                <td><h5>€{order.totalPrice}</h5></td>
                <td><h5>{order.user.name}</h5></td>
                <td><h5>{order.user.email}</h5></td>
                <td><h5>{order.payment.paymentMethod}</h5></td>
                <td><h5>{order.isPaid.toString()}</h5></td>
                <td><h5>{order.paidAt}</h5></td>
                <td><h5>{order.isDelivered.toString()}</h5></td>
                <td><h5>{order.deliveredAt}</h5></td>
                <td>
                  <Button variant="outline-primary" size="lg" ><Link to={"/order/" + order._id} >Details</Link></Button>
                  {' '}
                  <Button type="button" onClick={() => deleteHandler(order)} variant="outline-danger" size="lg">Delete</Button>
                </td>
              </tr>))}
            </tbody>
          </Table>

        </div>
      </div>
    </Container>
}
export default OrdersScreen;