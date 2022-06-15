const express = require ('express');
const { registerUser } = require('../controls/userControls');
const router = express.Router()
const passport = require ('passport');


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

router.get("/users/dashboard", function (req, res) {
    res.render('users',  { user: req.user.name })
});
router.get("/users/Admin", function (req, res) {
    res.send('welcome to the admin page')
});

// router.post(
//     "/login",
//     passport.authenticate("local", {
//       successRedirect: "/users/dashboard",
//       failureRedirect: "/login",
//       failureFlash: true,
//     })
//   );

router.post(
    "/login",
    passport.authenticate("local",  {
      failureRedirect: "/login",
      failureFlash: true,
    }),(req, res)=> {
        if (req.user.role === 'Admin'){
      res.redirect("/users/admin" );
        }
        else{
            res.redirect("/users/dashboard" );
        }
    }
  );


module.exports = {router}