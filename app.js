const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require('body-parser');
const {router} = require('./routes/UserRoute');
const cookieParser = require('cookie-parser');
const passport = require("passport")
const initializePassport = require("./passportconfig");
initializePassport(passport);
const port = process.env.PORT || 8000;

//view engine
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.urlencoded({
  extended: true  
}));

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize());
app.use(passport.session());


app.use(flash())

app.use(express.json())
app.use(cookieParser())
app.use( router)



app.listen(port, () => {
  console.log(`app running on port ${port}`)
})