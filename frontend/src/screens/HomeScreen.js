import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // // This menthod is now deprecaetd for Redux
  // const [products, setProducts] = useState([]) // Use state
  // // Note: Right when the HomeScreen loads, it will make a request to the backend Server for products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products')
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // }, [])
  // return (
  //   <>
  //     <h1>Latest Products</h1>
  //     <Row>
  //       {products.map((product) => (
  //         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
  //           <Product product={product} />
  //         </Col>
  //       ))}
  //     </Row>
  //   </>
  // )

  // New Methd
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList) // Displays the products from the store
  const { loading, error, products } = productList // pull loading, error and products from state

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
