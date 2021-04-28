import GoogleMapReact from 'google-map-react'
import { useState } from 'react'
import ATMMarker from './ATMMarker'

const Map = ({ location, results, zoom }) => {
  const markers = results.map((e, index) => {
    return (
      <ATMMarker
        key={index}
        lat={e.geometry.location.lat}
        lng={e.geometry.location.lng}
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
      </GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
  zoom: 14,
}

export default Map
