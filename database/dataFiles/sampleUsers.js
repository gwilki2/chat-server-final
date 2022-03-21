const bcrypt = require('bcrypt')

module.exports = [
    {
        firstName: 'John',
        lastName: 'Doe', 
        lang: 'en',
        gender: 'male', 
        email: 'john.doe@mail.com', 
        password: bcrypt.hashSync('secret', 10),
    }, 
    {
        firstName: 'Mary',
        lastName: 'Jane', 
        lang: 'fr',
        gender: 'female', 
        email: 'mary.jane@mail.com', 
        password: bcrypt.hashSync('secret', 10), 
    }, 
    {
        firstName: 'Ben',
        lastName: 'Franklin', 
        lang: 'en',
        gender: 'male', 
        email: 'benny@dollar.com', 
        password: bcrypt.hashSync('secret', 10), 
    }, 
    {
        firstName: 'Jane',
        lastName: 'Doe', 
        lang: 'es',
        gender: 'female', 
        email: 'jane.doe@mail.com', 
        password: bcrypt.hashSync('secret', 10), 
    }, 
]