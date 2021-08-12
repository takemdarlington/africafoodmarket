import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button } from 'react-bootstrap';

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div className="mt-5">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form" >
        <form onSubmit={submitHandler} className="mt-5">
          <ul className="form-container">
            <li>
              <h2 className="text-success">Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">Paypal</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="banktransfer"
                  value="banktransfer"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="banktransfer">Bank Transfer</label>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="electronicmoney"
                  value="electronicmoney"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="electronicmoney">Electronic Money</label>
              </div>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cashondelivery"
                  value="cashondelivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="cashondelivery">Cash on Delivery</label>
              </div>
            </li>

            <li>
              <Button type="submit" variant="outline-success" size="lg">
                Continue
              </Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
