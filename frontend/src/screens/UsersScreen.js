import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../actions/userActions';
import { Table, Container, Spinner } from 'react-bootstrap';

function UsersScreen(props) {
  const usersList = useSelector(state => state.usersList);
  const { loading, users, error } = usersList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      //
    };
  }, []);

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
                </td>
              </tr>))}
            </tbody>
          </Table>

        </div>
      </div>
    </Container>
}
export default UsersScreen;