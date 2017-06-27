
module.exports = {
  sendgrid: {
    connector: 'loopback-connector-sendgrid',
    api_key: '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'/*process.env.EMAIL_API_KEY*/
  },
  mailgun: {
    connector: 'loopback-connector-mailgun',
    apikey: 'key-cff65af5ac4d134f520f8046baa5bac2',
    domain: 'sandbox15a2dbf759a14c1bb32b44b46d806540.mailgun.org'
  }
}

