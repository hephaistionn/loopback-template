module.exports = {
    mongo: {
        connector: 'mongodb',
        url: process.env.DB_URL,
        database: 'myapp',
    },
    email: {
        name: 'email',
        connector: 'sendgrid',
        api_key: process.env.EMAIL_API_KEY
    }
}