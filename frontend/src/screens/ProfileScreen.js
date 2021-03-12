import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Button, Table } from 'react-bootstrap';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return (
    <Container>
      <div className="profile" >
        <div className="profile-info" className="mt-5">
          <div className="form">
            <form onSubmit={submitHandler} >
              <ul className="form-container">
                <li>
                  <h2 className="text-success">User Profile</h2>
                </li>
                <li>
                  {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
                  {error && <div>{error}</div>}
                  {success && <div>Profile Saved Successfully.</div>}
                </li>
                <li>
                  <label htmlFor="name">
                    Name
          </label>
                  <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="email">
                    Email
          </label>
                  <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor="password">Password</label>
                  <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                  </input>
                </li>

                <li>
                  <Button variant="outline-success" size="lg" type="submit" >Update</Button>
                </li>
                <li>
                  <Button type="button" variant="outline-danger" size="lg" onClick={handleLogout} className="full-width">Logout</Button>
                </li>

              </ul>
            </form>
          </div>
        </div>
        <div className="profile-orders content-margined">
          {
            loadingOrders ? <div className="text-center"><Spinner animation="border" variant="primary" /></div> :
              errorOrders ? <div>{errorOrders} </div> :
                <Table className="table" striped hover bordered>
                  <thead>
                    <tr>
                      <th> <h3>ID</h3></th>
                      <th><h3>DATE</h3></th>
                      <th><h3>TOTAL</h3></th>
                      <th><h3>PAID</h3></th>
                      <th><h3>ACTION</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => <tr key={order._id}>
                      <td> <h4>{order._id}</h4></td>
                      <td><h4>{order.createdAt}</h4></td>
                      <td><h4>${order.totalPrice}</h4></td>
                      <td><h4>{order.isPaid}</h4></td>
                      <td>
                        <Button variant="outline-primary" size="lg" ><Link to={"/order/" + order._id}>DETAILS</Link></Button>
                      </td>
                    </tr>)}
                  </tbody>
                </Table>
          }
        </div>
      </div>
    </Container>
  )
}

export default ProfileScreen;