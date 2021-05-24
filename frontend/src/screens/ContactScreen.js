import { Button, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const ContactScreen = () => {
  const [messageSent, setMessageSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await axios.post('api/contact', {
      name,
      email,
      subject,
      message,
    })
    if (res.status === 200) {
      setMessageSent(true)
    } else {
      setError(true)
    }
  }

  return (
    <>
      {error && <h3>Error: Message not sent</h3>}
      {messageSent ? (
        <h3>Your message has been sent!</h3>
      ) : (
        <div>
          <h3>Contact Us</h3>
          <Container>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Text className='text-muted'></Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className='text-muted'></Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter subject'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Form.Text className='text-muted'></Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  placeholder='Enter Message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Form.Text className='text-muted'></Form.Text>
              </Form.Group>
              <Button
                onClick={submitHandler}
                variant='outline-primary'
                type='submit'>
                Submit
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </>
  )
}

export default ContactScreen
