if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash');
const session = require('express-session');

const app = express()

// passport config
require('./config/passport')(passport);

// Routes (import)
const indexRouter = require('./routes/index')
/* const userRouter = require('./routes/users') */
const postcodeRouter = require('./routes/postcode')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

// View
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'))


// Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
/* app.use(bodyParser.json())  */

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
/* app.use('/', userRouter) */
app.use('/', postcodeRouter)
app.use('/', registerRouter)
app.use('/', loginRouter)

//Mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))



let port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log('Server started on port: ' + port)

})