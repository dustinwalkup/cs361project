import { useState, useEffect } from 'react'
import Map from '../components/Map'
import Loader from '../components/Loader'
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
  const [ATMResults, setATMResults] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const [mapLoading, setMapLoading] = useState(false)
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 45.5234515, lng: -122.6762071 },
  })
  const [convertLoading, setConvertLoading] = useState(false)
  const [searchedLocation, setSearchedLocation] = useState('')
  const [liveBTC, setLiveBTC] = useState('')
  const [BTCValue, setBTCValue] = useState(1)
  const [USDValue, setUSDValue] = useState('')
  const [BTCChange, setBTCChange] = useState(false)
  const [USDChange, setUSDChange] = useState(false)

  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (location) {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      })
    })
  }

  useEffect(() => {
    setPageLoading(true)
    if (!('geolocation' in navigator)) {
      setLocation((state) => ({
        ...state,
        loaded: true,
      }))
    } else {
      getUserLocation()
    }

    const fetchLiveBTC = async () => {
      const { data } = await axios.get('/api')
      setLiveBTC(data)
      setUSDValue(data)
    }
    fetchLiveBTC()
    setPageLoading(false)
  }, [])

  useEffect(() => {
    setMapLoading(true)
    const fetchATMResults = async () => {
      const { data } = await axios.get(
        `/api/search/${location.coordinates.lat},${location.coordinates.lng}`
      )

      setATMResults(data)
      setMapLoading(false)
    }
    fetchATMResults()
    setSearchedLocation('')
  }, [location])

  useEffect(() => {
    setBTCValue(USDValue / liveBTC)
    setBTCChange(false)
  }, [BTCChange, USDValue])

  useEffect(() => {
    setUSDValue(BTCValue * liveBTC)
    setUSDChange(false)
  }, [USDChange, BTCValue])

  const submitHandlerSearch = (e) => {
    e.preventDefault()
    const api_key = process.env.REACT_APP_GKEY
    const getCoordinates = async () => {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedLocation}&key=${api_key}`
      )

      setLocation((location) => {
        return {
          ...location,
          coordinates: {
            ...location.coordinates,
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          },
        }
      })
    }
    getCoordinates()
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
    <div>
      {pageLoading ? (
        <Loader />
      ) : (
        <main>
          <Row>
            <Col className='text-center' xs={12} md={6}>
              <Form onSubmit={submitHandlerSearch}>
                <h3 className='mb-4'>Locate a Bitcoin ATM near you</h3>
                <p className='py-4'>
                  Search location by address, city or zip code
                </p>
                <Form.Group controlId='search'>
                  <Form.Control
                    type='text'
                    placeholder='Enter location to search for BTC ATMs...'
                    value={searchedLocation}
                    onChange={(e) =>
                      setSearchedLocation(e.target.value)
                    }></Form.Control>
                </Form.Group>
                <Button
                  className='my-5'
                  type='submit'
                  variant='outline-primary'>
                  Search Location
                </Button>
              </Form>
              <hr />
              {convertLoading ? (
                <Loader />
              ) : (
                <Form className='mb-5'>
                  <h3 className='py-5'>Current conversion rate</h3>
                  <Row>
                    <Col>
                      <p className='pt-3'>Bitcoin</p>
                      <Form.Control
                        type='text'
                        placeholder='Enter BTC...'
                        value={BTCValue}
                        onChange={BTCChangeHandler}></Form.Control>
                    </Col>
                    <Col>
                      <p className='pt-3'>United States Dollar</p>
                      <Form.Control
                        type='text'
                        placeholder='Enter USD...'
                        value={USDValue}
                        onChange={USDChangeHandler}></Form.Control>
                    </Col>
                  </Row>
                </Form>
              )}
            </Col>
            <Col xs={12} md={6}>
              {!mapLoading ? (
                <Map
                  results={ATMResults}
                  location={location}
                  getUserLocation={getUserLocation}
                />
              ) : (
                <Loader />
              )}
            </Col>
          </Row>
        </main>
      )}
    </div>
  )
}

export default HomeScreen
