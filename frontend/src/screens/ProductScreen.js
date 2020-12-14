import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listProductDetails, listProducts } from '../actions/productActions'

const ProductScreen = ({ match }) => {
  // // Deprecated now for Redux
  // const [product, setProduct] = useState([])
  // // Note: Right when the HomeScreen loads, it will make a request to the backend Server for products
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`)
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // }, [match])
  // return (
  //   <>
  //     <Link className='btn btn-light my-3' to='/'>
  //       Go Back
  //     </Link>
  //     <Row>
  //       <Col md={6}>
  //         <Image src={product.image} alt={product.name} fluid />
  //       </Col>
  //       <Col md={3}>
  //         <ListGroup variant='flush'>
  //           <ListGroup.Item>
  //             <h3>{product.name}</h3>
  //           </ListGroup.Item>
  //           <ListGroup.Item>
  //             <Rating value={product.rating} text={`${product.numReviews}`} />
  //           </ListGroup.Item>
  //           <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
  //           <ListGroup.Item>Description: {product.description}</ListGroup.Item>
  //         </ListGroup>
  //       </Col>
  //       <Col md={3}>
  //         <Card>
  //           <ListGroup variant='flush'>
  //             <ListGroup.Item>
  //               <Row>
  //                 <Col>Price:</Col>
  //                 <Col>
  //                   <strong>${product.price}</strong>
  //                 </Col>
  //               </Row>
  //             </ListGroup.Item>
  //             <ListGroup.Item>
  //               <Row>
  //                 <Col>Status:</Col>
  //                 <Col>
  //                   {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
  //                 </Col>
  //               </Row>
  //             </ListGroup.Item>
  //             <ListGroup.Item>
  //               <Button
  //                 className='btn-block'
  //                 type='button'
  //                 disabled={product.countInStock === 0}
  //               >
  //                 Add To Cart
  //               </Button>
  //             </ListGroup.Item>
  //           </ListGroup>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </>
  // )

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
