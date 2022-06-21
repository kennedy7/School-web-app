const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {router} = require('./routes/UserRoute');
const { projectRouter } = require('./routes/projectsRoute');
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

//methodOverride
app.use(methodOverride('_method'))

app.use(express.json())
app.use(cookieParser())
app.use( router)
app.use(projectRouter)



app.listen(port, () => {
  console.log(`app running on port ${port}`)
})