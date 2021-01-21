const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000
const {User} = require('./model/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! 꺼져')
})

app.post('/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보드릉ㄹ client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success:true})
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// mongodb+srv://jji:<password>@boiler.dwcw2.mongodb.net/<dbname>?retryWrites=true&w=majority 
// ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOn1Jz2XsWZyAz8weucZVUoxjS7mLelQsxr4qSWFmHTV yoo7032@gmail.com
