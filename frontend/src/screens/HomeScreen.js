import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  // Check for keyword for search
  const keyword = match.params.keyword

  // New Methd
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList) // Displays the products from the store
  const { loading, error, products } = productList // pull loading, error and products from state

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

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
