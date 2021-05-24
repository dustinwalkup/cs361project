import React from 'react'

const LocationInfoBox = ({ info, closeBox }) => {
  return (
    <div className='location-info'>
      <button className='close-button' onClick={closeBox}>
        <h5>X</h5>
      </button>
      <h5 className='info-title'>ATM Location Info</h5>
      <ul>
        <li>
          <strong>{info.name}</strong>
        </li>
        <li>{info.address}</li>
        <li>Open Now: {info.hours ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  )
}

export default LocationInfoBox
