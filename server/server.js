const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      cookieParser = require('cookie-parser');


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth',{ useNewUrlParser: true })

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());


app.post('/api/user', (req,res) =>{

    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    user.save( (err, doc) => {
        if(err) res.status(400).send(err)
        res.status(200).send(doc)
    })
})

app.post('/api/user/login', (req, res) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {

        if (!user) return res.status(400).json({ message: 'Auth failed, user not found!' })

        user.comparePassword(req.body.password, user.password, (err, isMatch) => {
            console.log(isMatch);
            if (err) throw err;

            if (!isMatch) {

                res.status(400).json({ message: 'Wrong password' });
            } else {
                //res.status(200).send(isMatch)

                //acesta e callback-ul
                user.generateToken((err, user) => {
                    console.log(user)
                    if (err) return res.status(400).send(err);
                    res.cookie('auth', user.token).send('ok')

                })
            }
        });

        // if(user === null) {
        //     res.status(400).json({message:'Auth failed, user not found!'})
        // }else{

        //     bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        //         if (err) throw err;
        //         res.status(200).send(isMatch);
        //     })
        // }
    })
    //res.status(200).send(req.body.password)
});

//inainte de a se rula callback-ul se activeaza auth
app.get('/user/profile',auth, (req,res) =>{
    //putem sa apelam req.token pt ca l-am declarat
    //in auth
   res.status(200).send(req.token);

   
})







const port = process.env.PORT || 3001;

app.listen( port, () => {
    console.log(`Started on port ${port}`);
})