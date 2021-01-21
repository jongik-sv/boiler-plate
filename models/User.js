const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 1
    },
    lastName: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default:0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next){
    let user = this;

    if(user.isModified('password')) {
        // 비밀 번호를 암호화한다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    // console.log(this.password, plainPassword);
    // plainPassword 를 암호화된 비밀 번호와 비교한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {

        if(err) return callback(err);
        callback(null, isMatch);
    });

}

userSchema.methods.generateToken = function(callback) {
    let user = this;
    // jsonwebtoken을 사용해서 토큰 생성
    let token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id + 'secretToken' ==> token
    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    let user = this;
    // 토큰을 decode 한도
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        use.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return callback(err);
            callback(null, user);
        })
    })

}

const User =  mongoose.model('User', userSchema);

module.exports = {User};