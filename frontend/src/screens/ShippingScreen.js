import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button } from 'react-bootstrap';

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  }
  return <div className="mt-5">
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form mt-5" >
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2 className="text-success">Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Address
            </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
            </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
            </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
            </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <Button size="lg" type="submit" variant="outline-success">Continue</Button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;