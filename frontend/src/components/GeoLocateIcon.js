import React from 'react'

const GeoLocateIcon = ({ onClick }) => {
  return (
    <div className='icon-location'>
      <button onClick={onClick} className='fas fa-location-arrow'></button>
    </div>
  )
}

export default GeoLocateIcon
