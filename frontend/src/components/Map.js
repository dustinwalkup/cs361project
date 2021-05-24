import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import ATMMarker from './ATMMarker'
import GeoLocateIcon from './GeoLocateIcon'
import LocationInfoBox from './LocationInfoBox'

const Map = ({ location, results, zoom, getUserLocation }) => {
  const [locationInfo, setLocationInfo] = useState(null)

  const closeBox = () => {
    setLocationInfo(null)
  }

  const markers = results.map((e, index) => {
    return (
      <ATMMarker
        key={index}
        lat={e.geometry.location.lat}
        lng={e.geometry.location.lng}
        onClick={() =>
          setLocationInfo({
            name: e.name,
            address: e.vicinity,
            hours: e.opening_hours.open_now,
          })
        }
      />
    )
  })
  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GKEY }}
        defaultCenter={location.coordinates}
        defaultZoom={zoom}>
        {markers}
        <GeoLocateIcon onClick={getUserLocation} />
      </GoogleMapReact>
      {locationInfo && (
        <LocationInfoBox info={locationInfo} closeBox={closeBox} />
      )}
    </div>
  )
}

Map.defaultProps = {
  zoom: 14,
}

export default Map
