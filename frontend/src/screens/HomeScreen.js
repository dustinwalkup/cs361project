import { useState, useEffect } from 'react'
import Map from '../components/Map'
import Loader from '../components/Loader'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState({
    loaded: false,
    coordinates: { lat: 45.5234515, lng: -122.6762071 },
  })

  const onSuccess = (location) => {
    setUserLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    })
    console.log(userLocation)
  }

  useEffect(() => {
    setLoading(true)
    const fetchResults = async () => {
      const { data } = await axios.get('/api/search')

      setResults(data)
      setLoading(false)
    }
    fetchResults()
    if (!('geolocation' in navigator)) {
      setUserLocation((state) => ({
        ...state,
        loaded: true,
      }))
    }
    navigator.geolocation.getCurrentPosition(onSuccess)
  }, [])

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>Button</h3>
        </Col>
        <Col sm={6}>
          {!loading ? (
            <Map results={results} location={userLocation} />
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen
