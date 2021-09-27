const bcrypt = require('bcrypt')

// hash the password 'password101'
bcrypt.hash('password101', 10).then(console.log)