import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Jim Chang',
        email: 'warrior1744@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Mavis Liu',
        email: 'mavisliu@itri.org.tw',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default users