import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions/userActions';
import { Table, Container, Spinner, Button } from 'react-bootstrap';

function UsersScreen(props) {
  const usersList = useSelector(state => state.usersList);
  const { loading, users, error } = usersList;

  // const orderDelete = useSelector(state => state.orderDelete);
  // const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();
  // dispatch(getUsers);
  // dispatch(getUsers());

  useEffect(() => {
    // dispatch(listOrders());
    dispatch(getUsers());
    return () => {
      //
    };
  }, []);

  // const deleteHandler = (order) => {
  //   dispatch(deleteOrder(order._id));
  // }
  return loading ? <div><Spinner animation="border" variant="primary" /></div> :
    <Container>
      <div className="content content-margined">

        <div className="order-header ">
          <h3 className="text-success mt-3 mb-3">Users</h3>
        </div>
        <div className="order-list">

          <Table className="table" striped hover bordered>
            <thead>
              <tr>
                <th> <h4>ID</h4></th>
                <th><h4>USER</h4></th>
                <th><h4>EMAIL</h4></th>
                <th><h4>ACTIONS</h4></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (<tr key={user._id}>
                <td> <h5>{user._id}</h5></td>
                <td><h5>{user.name}</h5></td>
                <td><h5>{user.email}</h5></td>
                <td>
                  {/* <Button variant="outline-primary" size="lg" ><Link to={"/order/" + order._id} >Details</Link></Button>
                  {' '}
                  <Button type="button" onClick={() => deleteHandler(order)} variant="outline-danger" size="lg">Delete</Button> */}
                </td>
              </tr>))}
            </tbody>
          </Table>

        </div>
      </div>
    </Container>
}
export default UsersScreen;