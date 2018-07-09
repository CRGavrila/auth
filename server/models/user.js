const mongoose = require('mongoose')
      bcrypt = require('bcrypt'),
      jwt = require('jsonwebtoken');

const SALT_I = 10;


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    token:{
        type:String
    }
});

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(SALT_I, (err,salt) => {
            if(err) return next(err);
    
            bcrypt.hash(user.password , salt , (err,hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
    
            })
        })

    }else{
        next();
    }
    
})

userSchema.methods.comparePassword = (candidatePassword, password, callback) => {
    bcrypt.compare(candidatePassword, password, (err, isMatch) =>{
        //console.log(candidatePassword);
        //console.log(password);
        
         if(err) throw callback(err);
         callback(null,isMatch)
         
        //res.status(200).send(isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;

    // parolele nu se pun niciodata in cod
    // se foloseste un fisier ascuns config
     var token = jwt.sign(user._id.toHexString(), 'supersecret');
     user.token = token;

     user.save((err,user) =>{
        if(err) return cb(err);
            cb(null,user);
        })
    
}

userSchema.statics.findByToken = function(token, cb){
    const user = this;

    jwt.verify(token, 'supersecret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}



const User = mongoose.model('User', userSchema )

module.exports = { User }