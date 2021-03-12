import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Badge, Table, Image } from 'react-bootstrap';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return (
    <Container>
      <br></br>
      <br></br>

      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3 className="text-success">
                Items in Cart <Badge variant="success"> {cartItems.length}</Badge>
          </h3>
             
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  <h3>Cart is empty</h3>
          </div>
                :

               
            <Table className="table"  hover >
            <thead>
              <tr>
                <th> <h3>Image</h3></th>
                <th><h3>Item</h3></th>
                <th><h3>Quantity</h3></th>
                <th><h3>Action</h3></th>
                <th><h3>Price</h3></th>
              </tr>
            </thead>
            <tbody>
                    {cartItems.map(item => <tr key={item._id}>
                      <td> <Image roundedCircle style={{ height: 60, width:60}} src={item.image} alt="product" /></td>
                      <td><h3>{item.name}</h3></td>
                      <td><Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))} >
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}

                      </Form.Control></td>
                      <td><Button type="button" size="lg" variant="outline-danger" className="button" onClick={() => removeFromCartHandler(item.product)} >
                        Delete
                    </Button></td>
                      <td><h3>${item.price}</h3></td>
                
              </tr>)}
            </tbody>
          </Table>

                
            }
          </ul>

        </div>
        <div className="cart-action">
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + Number(c.price) * c.qty, 0)}
          </h3>
          <Button variant="outline-success" onClick={checkoutHandler} size="lg" className="full-width mt-3" disabled={cartItems.length === 0}>
            <h4>Proceed to Checkout</h4>
      </Button>

        </div>

      </div>
    </Container>
    )
}

export default CartScreen;