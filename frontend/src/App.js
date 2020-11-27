import React from 'react'
import { Container } from 'react-bootstrap' // We import Containers from react-bootstrap
import Header from './components/Header' // If Header does not contain "default" in export, then you need to do {}
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
