import React from 'react'

const CurrencyDisplay = ({ currency, radioValue }) => {
  return (
    <>
      <span className='text-center my-4 py-3 px-3 badge badge-primary'>
        {radioValue === '1'
          ? `${currency.toLocaleString('en-us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} BTC`
          : `$${currency.toLocaleString('en-us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
      </span>
    </>
  )
}

export default CurrencyDisplay
