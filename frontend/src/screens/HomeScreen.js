import { useState, useEffect } from 'react'
import Map from '../components/Map'
import Loader from '../components/Loader'
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap'
import axios from 'axios'
import CurrencyDisplay from '../components/CurrencyDisplay'

const HomeScreen = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 45.5234515, lng: -122.6762071 },
  })
  const [searchedLocation, setSearchedLocation] = useState('')
  const [btcValue, setBtcValue] = useState(55054.7)
  const [currency, setCurrency] = useState('')
  const [convertedCurrency, setConvertedCurrency] = useState('')
  const [radioValue, setRadioValue] = useState('1')

  const radios = [
    { name: 'USD to BTC', value: '1' },
    { name: 'BTC to USD', value: '2' },
  ]

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
    setConvertedCurrency('')
  }, [radioValue])

  const submitHandlerSearch = (e) => {
    e.preventDefault()
    console.log(searchedLocation)
  }
  const submitHandlerConvert = (e) => {
    e.preventDefault()
    if (radioValue === '1') setConvertedCurrency(currency / btcValue)
    if (radioValue === '2') setConvertedCurrency(currency * btcValue)
    setCurrency('')
  }

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
          {/* <span className='text-center my-4 py-3 px-3 badge badge-primary'>
            1 BTC = $
            {`${btcValue.toLocaleString('en-us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </span> */}

          {/* <CurrencyDisplay currency={btcValue} /> */}

          <Form onSubmit={submitHandlerConvert}>
            <Form.Group controlId='convert' className='my-3'>
              <Form.Control
                type='text'
                placeholder='Enter Currency...'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}></Form.Control>
            </Form.Group>
            <ButtonGroup toggle className=''>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  type='radio'
                  variant='outline-primary'
                  name='radio'
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}>
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br />
            <Button className='my-3' type='submit' variant='outline-primary'>
              covert currency
            </Button>
          </Form>
          {convertedCurrency && (
            <CurrencyDisplay
              currency={convertedCurrency}
              radioValue={radioValue}
            />
          )}
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
