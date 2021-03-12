import React from 'react';
function CheckoutSteps(props) {
  return <div className="checkout-steps">
    <div className={props.step1 ? 'active text-success' : ''} > <h4>Signin</h4></div>
    <div className={props.step2 ? 'active text-success' : ''} ><h4>Shipping</h4></div>
    <div className={props.step3 ? 'active text-success' : ''} ><h4>Payment</h4></div>
    <div className={props.step4 ? 'active text-success' : ''} ><h4>Place Order</h4></div>
  </div>
}

export default CheckoutSteps;