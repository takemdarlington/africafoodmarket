import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { Table, Container, Spinner, Nav, Button, TabContainer, Row, Col, Tabs, Tab, Badge } from 'react-bootstrap';


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <Container>
      <div>
        <div className="back-to-result">
          <Link to="/"> <h3 className="text-success"> Back to result</h3></Link>
        </div>
        {loading ? (
          <div className="text-center"><Spinner animation="border" variant="success" /></div>
        ) : error ? (
          <div>{error} </div>
        ) : (
              <>
             <Row>
                  <div className="details">
                    <Col>
                      <div className="details-image">
                        <img style={{width:200, height:170}} src={product.image} alt="product"></img>
                      </div>
                    </Col>
                    <div className="details-info">
                      <ul>
                        <li>
                          <h4 className="text-success">{product.name}</h4>
                        </li>
                        <li>
                          <a href="#reviews">
                            <Rating
                              value={product.rating}
                              text={product.numReviews + 'reviews'}
                            />
                          </a>
                        </li>
                        <li>
                          <h5>Price: <b>€{product.price}</b></h5>
                        </li>
                        <li>
                          <h4> Description:</h4>                  
                          <div><h5>{product.description}</h5></div>
                        </li>
                      </ul>
                    </div>
                    <div className="details-action">
                      <ul>
                        <li><h5>Price: {product.price}</h5></li>
                        <li>
                          Status:{' '}
                          {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                        </li>
                        <li>
                          Qty:{' '}
                          <select
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </li>
                        <li>
                          {product.countInStock > 0 && (
                            <Button
                              onClick={handleAddToCart}
                              variant="outline-success" size="lg"
                            >
                              Add to Cart
                            </Button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
             </Row>
                <br></br><br></br>
                <Tabs defaultActiveKey="Reviews" id="uncontrolled-tab-example">
                  <Tab eventKey="Reviews" title="Reviews">
                    <h4 className="mt-5 text-success">Reviews <Badge variant="success">{product.reviews.length}</Badge></h4>
                    {!product.reviews.length && <div>There is no review</div>}
                    <ul className="review" id="reviews">
                      {product.reviews.map((review) => (
                        <li key={review._id}>
                          <div>{review.name}</div>
                          <div>
                            <Rating value={review.rating}></Rating>
                          </div>
                          <div>{review.createdAt.substring(0, 10)}</div>
                          <div>{review.comment}</div>
                        </li>
                      ))}
                    </ul>
                    </Tab>
                    <Tab eventKey="Write" title="Write a Customer Review">
                    <ul className="mt-5">
                      <li>
                        <h4 className="text-success" >Write a customer review</h4>
                        {userInfo ? (
                          <form onSubmit={submitHandler}>
                            <ul className="form-container">
                              <li>
                                <label htmlFor="rating">Rating</label>
                                <select
                                  name="rating"
                                  id="rating"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value="1">1- Poor</option>
                                  <option value="2">2- Fair</option>
                                  <option value="3">3- Good</option>
                                  <option value="4">4- Very Good</option>
                                  <option value="5">5- Excelent</option>
                                </select>
                              </li>
                              <li>
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                  name="comment"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </li>
                              <li>
                                <Button type="submit" variant="outline-success" size="lg">
                                  Submit
                        </Button>
                              </li>
                            </ul>
                          </form>
                        ) : (
                            <div>
                              Please <Link to="/signin">Sign-in</Link> to write a review.
                            </div>
                          )}
                      </li>
                    </ul>
                    </Tab>
                    
                  </Tabs>

              
              </>
            )}
      </div>
    </Container>
  );
}
export default ProductScreen;
