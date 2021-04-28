import { Icon } from '@iconify/react'
import bitcoinIcon from '@iconify-icons/logos/bitcoin'

const ATMMarker = ({ lat, lng, onClick }) => {
  return (
    <div className='atm-marker' onClick={onClick}>
      <Icon icon={bitcoinIcon} className='bitcoin-icon' />
    </div>
  )
}

export default ATMMarker
