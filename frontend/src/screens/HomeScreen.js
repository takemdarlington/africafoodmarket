import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { Alert, Carousel, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
// import Carousel from 'react-bootstrap/Carousel';

import bg1 from './bg1.jpg';
import bg2 from './bg2.jpg';
import bg3 from './bg5.jpg';
import p1 from './p1.jpg';
import p2 from './p2.jpg';
import p3 from './p3.png';

import l1 from './l1.PNG';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>

      <h1 className="text-center text-success mt-4">{category && <h1> Category : {category}</h1>}</h1>

      <Container>
        <Row>
          <Col></Col>
          <Col md={4}>
            {/* Sort By{' '} */}
            <Form >
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control size="lg" as="select" custom name="sortOrder" onChange={sortHandler}>
                  <option value="">Sort by</option>
                  <option value="">Newest</option>
                  <option value="lowest">Lowest</option>
                  <option value="highest">Highest</option>
                </Form.Control>
              </Form.Group>
            </Form>

          </Col>
            <Col md={5}> 
            <Form inline>
              <form onSubmit={submitHandler}>
              <Form.Control className="mr-3" type="text" placeholder="search by product" size="lg"
                  name="searchKeyword"
                  onChange={(e) => setSearchKeyword(e.target.value)}
              />
                {/* <input
                  className=" mt-2 mb-2 mr-sm-3"
                  
                  name="searchKeyword"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                /> */}
                 <Button type="submit" variant="outline-primary" size="lg">Search</Button> 
              </form>
            </Form>
            </Col>
           

        </Row>
      </Container>
      {/* <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul> */}


{/* Landing page Carousel */}

      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={bg2}
            alt="First slide"
          />
          <Carousel.Caption >
            <h3>Welcome to Afican Food Market</h3>
            <p>Traditionally, the various cuisines of Africa use a combination of locally available fruits, cereal grains and vegetables, as well as milk and meat products, and do not usually have food imported. In some parts of the continent, the 
              traditional diet features an abundance of milk, curd and whey products.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={bg1}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={bg3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br></br><br></br>
      <br></br>

      {/* <Container>
        <Row>
          <Col xs={12} md={4}>
            <Image src={p1} roundedCircle />
            <h3 className="text-center">Fried polish rice with baked bread</h3>

          </Col>
          <Col xs={12} md={4}>
            <Image src={p1} roundedCircle />
            <h3 className="text-center">Fried polish rice with baked bread</h3>
          </Col>
          <Col xs={12} md={4}>
            <Image src={p1} roundedCircle />
            <h3 className="text-center">Fried polish rice with baked bread</h3>

          </Col>
        </Row>
      </Container> */}

      <br></br><br></br>
      <br></br>
      <Container>
        <Row>
          <Col>
          {/* <Image src={l1} /> */}

          </Col>
        </Row>
        
      </Container>
      

      {loading ? (
        <div className="text-center">  <br></br> <br></br> <br></br>
         <Spinner animation="border" variant="primary" /></div>
      ) : error ? (
        <div>{error}</div>
      ) : (




        <Container>
              <br></br><br></br>
              <br></br>
              <Row>
                <Col> <hr></hr></Col>
                <Col> <h2 className="text-center text-success"> 
                Featured Items  <Badge variant="success"> {products.length}</Badge></h2>
                </Col>
                <Col > <hr></hr> </Col>
              </Row>
             

            <Row style={{marginBottom: "50px"}}>
                <br></br><br></br>
                <br></br>

                  {/* <div className="products"> */}
                    {products.map((product) => (
                      <Col xs={6} sm={6} md={3} key={product._id}>

                      <Card>
                        <Link to={'/product/' + product._id}>
                          <Card.Header as="h2">{product.category}</Card.Header>
                            <Card.Img className="item" variant="top" thumbnail  src={product.image} />
                          <Card.Body>
                            <Link to={'/product/' + product._id}></Link>
                              <Card.Title variant="success" as="h2"><Link to={'/product/' + product._id}>{product.name}</Link></Card.Title>
                              <Card.Text as="h4">
                              {product.description} <br></br>
                              €{product.price}
                            </Card.Text>
                            <Button variant="success">View Details</Button>
                          </Card.Body>
                        </Link>
                        <div className="product-rating">
                          <Rating
                            value={product.rating}
                            text={product.numReviews + ' reviews'}
                          />
                        </div>
                      </Card>
                      </Col>

                      // <li key={product._id}>
                      //   <div className="product">
                      //     <Link to={'/product/' + product._id}>
                      //       <img
                      //         className="product-image"
                      //         src={product.image}
                      //         alt="product"
                      //       />
                      //     </Link>
                      //     <div className="product-name">
                      //       <Link to={'/product/' + product._id}>{product.name}</Link>
                      //     </div>
                      //     <div className="product-brand">{product.brand}</div>
                      //     <div className="product-price">${product.price}</div>
                      //     <div className="product-rating">
                      //       <Rating
                      //         value={product.rating}
                      //         text={product.numReviews + ' reviews'}
                      //       />
                      //     </div>
                      //   </div>
                      // </li>
                    ))}
                  {/* </div> */}


                     
   
  </Row>
              
            </Container>

        
      )}
    </>
  );
}
export default HomeScreen;
