require('dotenv').config()
exports.GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID || ''
exports.GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET || ''
exports.HOST=process.env.HOST || 'localhost'
exports.PORT=process.env.PORT || 8080
exports.SECRET=process.env.SECRET || 'some_secret'
