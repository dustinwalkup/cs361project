import { useState, useEffect } from 'react'
import Map from '../components/Map'
import Loader from '../components/Loader'
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 45.5234515, lng: -122.6762071 },
  })
  const [searchedLocation, setSearchedLocation] = useState('')
  const [liveBTC, setLiveBTC] = useState(55054.7)
  const [BTCValue, setBTCValue] = useState(1)
  const [USDValue, setUSDValue] = useState(liveBTC)
  const [BTCChange, setBTCChange] = useState(false)
  const [USDChange, setUSDChange] = useState(false)

  // const getUserLocation = async () => {
  //   navigator.geolocation.getCurrentPosition(function (location) {
  //     setUserLocation({
  //       loaded: true,
  //       coordinates: {
  //         lat: location.coords.latitude,
  //         lng: location.coords.longitude,
  //       },
  //     })
  //   })
  // }

  useEffect(async () => {
    setLoading(true)
    // if (!('geolocation' in navigator)) {
    //   setUserLocation((state) => ({
    //     ...state,
    //     loaded: true,
    //   }))
    // } else {
    //   await getUserLocation()
    // }
    const fetchResults = async () => {
      const { data } = await axios.get(
        `/api/search/${location.coordinates.lat},${location.coordinates.lng}`
      )

      setResults(data)
      setLoading(false)
    }
    fetchResults()
  }, [])

  useEffect(async () => {
    setBTCValue(USDValue / liveBTC)
    setBTCChange(false)
  }, [BTCChange])

  useEffect(async () => {
    setUSDValue(BTCValue * liveBTC)
    setUSDChange(false)
  }, [USDChange])

  const submitHandlerSearch = (e) => {
    e.preventDefault()
    console.log(searchedLocation)
  }

  const USDChangeHandler = (e) => {
    setUSDValue(e.target.value)
    setBTCChange(true)
  }
  const BTCChangeHandler = (e) => {
    setBTCValue(e.target.value)
    setUSDChange(true)
  }

  return (
    <>
      <Row>
        <Col className='text-center' xs={12} md={6}>
          <Form onSubmit={submitHandlerSearch}>
            <h3 className='mb-4'>Locate a Bitcoin ATM near you</h3>
            <p className='py-4'>Search location by zip code or city</p>
            <Form.Group controlId='search'>
              <Form.Control
                type='text'
                placeholder='Enter Location to search for BTC ATMs...'
                value={searchedLocation}
                onChange={(e) =>
                  setSearchedLocation(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button className='my-5' type='submit' variant='outline-primary'>
              Search Location
            </Button>
          </Form>
          <hr />
          <Form className='mb-5'>
            <h3 className='py-5'>Current conversion rate</h3>
            <Row>
              <Col>
                <p className='pt-3'>Bitcoin</p>
                <Form.Control
                  type='text'
                  placeholder='Enter BTC...'
                  value={BTCValue.toLocaleString('en-us', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 5,
                  })}
                  onChange={BTCChangeHandler}></Form.Control>
              </Col>
              <Col>
                <p className='pt-3'>United States Dollar</p>
                <Form.Control
                  type='text'
                  placeholder='Enter USD...'
                  value={USDValue.toLocaleString('en-us', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  onChange={USDChangeHandler}></Form.Control>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          {!loading ? (
            <Map results={results} location={location} />
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
