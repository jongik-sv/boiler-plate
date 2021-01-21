const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000

mongoose.connect('mongodb+srv://jji:jji@boiler.dwcw2.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// mongodb+srv://jji:<password>@boiler.dwcw2.mongodb.net/<dbname>?retryWrites=true&w=majority 