
const session = require('express-session');

module.exports = session({
    secret: process.env.SESSION_SECRET || 'd6da2fa5bfcb3ac24b3ed8a98e2bef05714f6ea0b3b58241a6bfb06f0bcb5146debe2930a343959b85a7074afcf124ef860df45a0ee9ed9f48e9fe94038af795',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
});