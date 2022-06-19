const express = require ('express');
const { registerUser } = require('../controls/userControls');
const router = express.Router()
const passport = require ('passport');
const {authUser, authRole} = require ('../basicAuth')



router.get("/", function (req, res) {
    res.render('index')
});

router.get("/signIn", function (req, res) {
    res.render('signup')
});
router.get("/login", function (req, res) {
    res.render('login')
});
router.post("/signup", registerUser)

router.get("/student/dashboard", authUser, function (req, res) {
    res.render('studentdashboard',  { user: req.user.name })
});
router.get("/admin/dashboard",  authUser, authRole, function (req, res) {
    res.render('Admindashboard',  { user: req.user.name })
});
router.get("/admin/projects",  authUser, authRole, function (req, res) {
    res.send(' admin project acces page')
});


router.post(
    "/login",
    passport.authenticate("local",  {
      failureRedirect: "/login",
      failureFlash: true,
    }),(req, res)=> {
        if (req.user.role === 'Admin'){
      res.redirect("/admin/dashboard" );
        }
        else{
            res.redirect("/student/dashboard" );
        }
    }
  );


  //In passport new update 'logout' is now an asynchronous function and requires a callback
  router.get("/users/logout", (req, res) => {
    req.logout(
        function(err) {
            if (err) { return next(err); }
    req.flash("success_msg", "session terminated");
    res.redirect("/login");
        })
  });


module.exports = {router}