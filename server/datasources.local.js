var path = require('path');
module.exports = {
  sendgrid: {
    connector: 'loopback-connector-sendgrid',
    api_key: process.env.EMAIL_API_KEY
  },
  sendmail: {
        connector: 'loopback-connector-sendmail'
  },
  filesystem: {
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: path.join(__dirname, '../storage'),
    maxFileSize: '52428800'
  }
}