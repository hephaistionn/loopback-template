
module.exports = {
  sendgrid: {
    connector: 'loopback-connector-sendgrid',
    api_key: process.env.EMAIL_API_KEY
  },
  sendmail: {
        "connector": "loopback-connector-sendmail"
  },
}