import React from 'react'
import { Container } from 'react-bootstrap' // We import Containers from react-bootstrap
import Header from './components/Header' // If Header does not contain "default" in export, then you need to do {}
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
