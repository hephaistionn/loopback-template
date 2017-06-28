
module.exports = {
  sendgrid: {
    connector: 'loopback-connector-sendgrid',
    api_key: process.env.EMAIL_API_KEY
  },
  mailgun: {
    connector: 'loopback-connector-mailgun',
    apikey: '',
    domain: ''
  }
}

