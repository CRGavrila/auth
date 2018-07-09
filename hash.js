// crypte the password
const bcrypt = require('bcrypt');

//generate a token for every user
const {MD5} = require('crypto-js');

const jwt = require('jsonwebtoken');
// bcrypt.genSalt(10, (err, salt) => {
//     if(err) return next(err);

//     bcrypt.hash('password123', salt, (err,hash) => {
//         if(err) return next(err);
//         console.log(hash)
//     })
//     console.log(salt)
// })


//acest token se salveaza in browserul clientului!!!!!
//local storage sau cookie
//   MD5('SDFSDFSDFSDF').toString()


//cream un o parola ca sa codam token-ul 
// const secret = 'mysecretpassword';
// const secretSalt = 'SERVER_PASSWORD';

// const user = {
//     id: 1,
//     token: MD5('SDFSDFSDFSDF').toString() + secretSalt
// }

// const receivedToken = 'd2ce944db875a04a234056f1a4301224SERVER_PASSWORD'

// if(receivedToken === user.token){
//     console.log('move forward')
// }else {
//     console.log('stop right there')
// }


// console.log(user)

const id = '1000';
const secret = 'supersecret'

const receivedTken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const token = jwt.sign(id, secret);

const decodeToken = jwt.verify(receivedTken,secret)

console.log(decodeToken);