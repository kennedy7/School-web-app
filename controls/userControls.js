const {pool} = require ('../dbConfig')
const bcrypt = require ('bcrypt')


exports.registerUser = async function (req, res) {
    const {
        name,
        email,
        role,
        password,
        password2
      } = req.body;
      
      console.log({
        name,
        email,
        role,
        password,
        password2,
      });
  
    let errs = [];
  
    if (password.length < 6) {
      errs.push({
        message: "password should be atleast 6 characters"
      });
    }
    if (password != password2) {
      errs.push({
        message: " passwords do not match"
      });
    }
    if (errs.length > 0) {
      res.render("signup", {
        errs
      });
    } else {
      //Form validation successful
      let hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
  
      pool.query(
        `SELECT * FROM users
      WHERE email  = $1`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            errs.push({
              message: "Email already exist"
            });
            res.render("signup", {
              errs
            });
          } else {
            pool.query(
              `INSERT INTO users(name, email, role, password)
                  VALUES($1, $2, $3, $4)
                  RETURNING id, password`,
              [name, email, role, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "you are now registered, Please login");
                res.redirect("/login");
              }
            );
          }
        }
      );
    }
  };
  