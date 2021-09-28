const bcrypt = require('bcrypt')

// hash the password 'password101'
bcrypt.hash('password101', 10).then(console.log)

// compare a password with a hash
bcrypt.compare('password101', '$2b$10$AQXoVkfzAovJ9RHTtmd6N.Yegy3V9ALTlYDcCM76HxBqq044q6xLK').then(console.log)