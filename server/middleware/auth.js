const { User } = require('../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.auth;
    //console.log(token)  
    User.findByToken(token,(err, user)=>{
        if (err) return res.status(400).send(err);
        if(!user) return res.status(401).send('no access');

        //res.status(200).send('you have access')
       // req.token = token
       req.token = 'bla bla';
        next();
    })
}

module.exports = { auth }