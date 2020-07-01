if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const http = require('http')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash');
const session = require('express-session');
const socketio = require('socket.io')
const auto = "Admin"
const methodOverride = require('method-override')
const formatMessage = require('./utils/chats')

const app = express()
const server = http.createServer(app) 
const io = socketio(server)

const Comments = require('./models/comments')

// passport config
require('./config/passport')(passport);

// Routes (import)
const indexRouter = require('./routes/index')
const postcodeRouter = require('./routes/postcode')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const postController = require('./routes/postController') 
const userController = require('./routes/userMessageBoard') 
const swapRouter = require('./routes/swaps') 

// View
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))

// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
/* app.use(bodyParser.json())  */

//run web socket on client connection
io.on('connection', socket => {


  // welcome user
    socket.emit('message', formatMessage(auto, 'Welcome to LocalChat'));

    // user disconnection
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(auto,'A user has left'));
    })
  
  // broadcast user connection
  socket.broadcast.emit('message', formatMessage(auto, 'A user has joined'));
  
  
  
  // listen for chat message
  socket.on('chatMessage', msg => {
    io.emit('message', formatMessage('user', msg))
  })
  })//end of socket


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// passport
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.successMsg = req.flash('successMsg');
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

// Routes (use)
app.use('/', indexRouter)
app.use('/', postcodeRouter)
app.use('/', registerRouter)
app.use('/', loginRouter)
app.use('/', postController) 
app.use('/', userController)
app.use('/', swapRouter)  

//Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))


// get and save new comments
io.on('connection',function(socket){
  socket.on('comment',function(data){
      var commentData = new Comments(data);
      commentData.save();
      socket.broadcast.emit('comment', (data));
      
  });

});

let port = 3000;
server.listen(process.env.PORT || port, () => {
  console.log('Server started on port: ' + port)

})