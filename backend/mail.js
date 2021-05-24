import nodemailer from 'nodemailer'
import mailGun from 'nodemailer-mailgun-transport'
import dotenv from 'dotenv'
dotenv.config()

const auth = {
  auth: {
    api_key: 'c16b726e41ec3a36bfc4edccc204fbdb-6ae2ecad-1c463388',
    domain: 'sandbox45f42b7c57ad4ef88a5d6af17eff8375.mailgun.org',
  },
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (email, subject, text, cb) => {
  const mailOptions = {
    from: email,
    to: 'dustinwalkup@gmail.com',
    subject,
    text,
  }
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  })
}

export default sendMail
