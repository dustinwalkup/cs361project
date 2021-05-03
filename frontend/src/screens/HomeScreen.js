import { useState, useEffect } from 'react'
import Map from '../components/Map'
import Loader from '../components/Loader'
import {
  Col,
  Row,
  Form,
  Button,
  Dropdown,
  InputGroup,
  DropdownButton,
} from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 45.5234515, lng: -122.6762071 },
  })
  const [searchedLocation, setSearchedLocation] = useState('')
  const [currency, setCurrency] = useState('')

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

  const submitHandlerSearch = () => {}
  const submitHandlerConvert = () => {}

  return (
    <>
      <Row>
        <Col className='text-center' xs={12} md={6}>
          <Form onSubmit={submitHandlerSearch}>
            <Form.Group controlId='search'>
              <Form.Control
                type='text'
                placeholder='Enter Location...'
                value={searchedLocation}
                onChange={(e) =>
                  setSearchedLocation(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button className='my-3' type='submit' variant='outline-primary'>
              Search Location
            </Button>
            <p className='pt-3'>Search location by zip code or city</p>
          </Form>
          <hr />
          <span className='text-center my-4 py-3 px-3 badge badge-primary'>
            1 BTC = $55,054.70
          </span>
          <Form onSubmit={submitHandlerConvert}>
            <Form.Group controlId='convert' className='my-3'>
              <Form.Control
                type='text'
                placeholder='Enter Currency...'
                value={currency}
                onChange={(e) =>
                  setSearchedLocation(e.target.value)
                }></Form.Control>
            </Form.Group>
            <DropdownButton
              className='dropdown my-3'
              as={InputGroup.Prepend}
              variant='outline-primary'
              title='Select Conversion'
              id='input-group-dropdown-1'>
              <Dropdown.Item href='#'>BTC to USD</Dropdown.Item>
              <Dropdown.Item href='#'>USD to BTC</Dropdown.Item>
            </DropdownButton>
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
