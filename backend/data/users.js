import bcrypt from 'bcryptjs'

const users = [
    {
        firstname: 'Jim',
        lastname: 'Chang',
        email: 'warrior1744@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        firstname: 'Mavis',
        lastname: 'Liu',
        email: 'mavisliu@itri.org.tw',
        password: bcrypt.hashSync('a92070044', 10),
        isAdmin: true
    },
    {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default users