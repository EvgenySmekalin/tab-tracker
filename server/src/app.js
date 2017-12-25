const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config/config')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

sequelize.sync()
  .then(() => {
    http.listen(config.port, function () {
      console.log(`listening on *:${config.port}`)
    })
  })

/*
app.listen(process.env.PORT || 8081)
*/
