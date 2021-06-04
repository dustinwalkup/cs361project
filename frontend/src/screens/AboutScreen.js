import React from 'react'

const AboutScreen = () => {
  return (
    <>
      <h3>About us</h3>
      <p className='py-2'>
        BTC ATM Locator is a project that was designed and developed for CS 361
        Software Engineering I at Oregon State in the Spring of 2021{' '}
      </p>
      <p className='py-2'>
        This project was part of a microservices project with 4 other students
        from the class. It consumes the BTC to USD conversion rate as an API
        from another service{' '}
      </p>
      <p className='py-2'>
        This project also serves as a Wikipedia page PDF scraper{' '}
      </p>
      <h4>API Guide</h4>
      <p className='pt-2'>
        This API will scrape any Wikipedia page and return a list of PDF strings
        from the citation section
      </p>
      <p className='pt-2'>
        https://btcatmlocator.herokuapp.com/api/scrape/subject
      </p>
      <p className='pt-2'>
        Replace 'subject' with the page you would like to scrape. The URL is
        case sensitive, input the subject exactly how it is written in the
        Wikipedia URL.
      </p>
      Example:
      <p className='pt-2'>
        https://en.wikipedia.org/wiki/World_War_II
        <br />
        https://btcatmlocator.herokuapp.com/api/scrape/World_War_II
      </p>
    </>
  )
}

export default AboutScreen
