const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./config/key');
const {auth} = require('./middleware/auth');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! 꺼져')
})

app.post('/api/user/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    console.log(req.body);
    // return;
    user.save((err, userInfo) => {
        
        if(err) {
            console.log(err);
            return res.json({success: false, err});
        }
        return res.status(200).json({success:true})
    })
})

app.post('/api/user/login', (req, res) => {
   // 요쳥된 email을 데이터베이스에서 찾는다.
   User.findOne({ email: req.body.email}, (err, user) => {
       if(!user) {
           return res.json({
               loginSucess: false,
               message: "해당유저가 없습니다."
           })
       }

       // 비밀번호가 같은지 확인한다.
       user.comparePassword(req.body.password, (err, isMatch) => {
           if(!isMatch) {
               return res.json({loginSucess:false, message: "비밀번호가 틀렸습니다."});
           }

           // 비밀번호가 맞으면 토큰을 생성한다.
           user.generateToken((err, user) => {
               if(err) return res.status(400).send(err);

                // 토큰을 저장한다. where?? 쿠키, 로컬 스토리지, 세션
                // 여기서는 쿠키에 저장한다. cookieParser
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSucess: true, userId:user._id});

           });
       })


   })

})


// role 1 어드민 role 2 특정 부서 어드민
// role 0 일반 유저 role 0 아니면 관리자

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 것은 authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: ture,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    });
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


// mongodb+srv://jji:<password>@boiler.dwcw2.mongodb.net/<dbname>?retryWrites=true&w=majority 
// ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOn1Jz2XsWZyAz8weucZVUoxjS7mLelQsxr4qSWFmHTV yoo7032@gmail.com
