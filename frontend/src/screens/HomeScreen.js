import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { Carousel, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';


import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg5.jpg';

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

                <Button type="submit" variant="outline-primary" size="lg">Search</Button>
              </form>
            </Form>
          </Col>


        </Row>
      </Container>


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


          <Row style={{ marginBottom: "50px" }}>
            <br></br><br></br>
            <br></br>

            {products.map((product) => (
              <Col xs={6} sm={6} md={3} key={product._id}>

                <Card>
                  <Link to={'/product/' + product._id}>
                    <Card.Header as="h2">{product.category}</Card.Header>
                    <Card.Img className="item" variant="top" thumbnail src={product.image} />
                    <Card.Body>
                      <Link to={'/product/' + product._id}></Link>
                      <Card.Title variant="success" as="h2"><Link to={'/product/' + product._id}>{product.name}</Link></Card.Title>
                      <Card.Text as="h4">
                        {product.description} <br></br>
                        ${product.price}
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

            ))}




          </Row>

        </Container>


      )}
    </>
  );
}
export default HomeScreen;
