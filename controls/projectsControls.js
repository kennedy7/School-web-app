const {pool} = require('../dbConfig')


exports.AddProject = function (req, res){
    const {userId, department, level, title , content, summary} = req.body
    console.log({userId,department, title, content, summary})
  pool.query(
     `INSERT into projects (userId, department, level, title, content, summary) VALUES ($1, $2, $3, $4, $5, $6)`,
     [userId, department, level, title, content, summary],
     (err, results) => {
        if(err){
            throw err
        } 
        console.log(results.rows)
         res.redirect('/users/projectlist')
    })
}

exports.GetStudentProject = function (req, res) {
    const id = req.params.id
    pool.query(
        'SELECT * FROM projects WHERE id =$1', [id],
        (error, results) => {
            res.render('Projectsdetails', {
              user:req.user.name,
              project: results.rows[0],
            
            });
        });
  }

  exports.EditProject = (req, res) => {
    var id = req.params.id;
    pool.query(
      'SELECT * from projects where id= $1',
      [id],
      (err, results) => {
        // console.log(results.rows)
        res.render('edit.ejs', {
          project: results.rows[0]
        });
      });
  } 
  // exports.GetAdminProjects = function (req, res) {
  //   const id = req.params.id
  //   pool.query(
  //       'SELECT * FROM projects WHERE id =$1', [id],
  //       (error, results) => {
  //           res.render('userarticles', {
  //             user:req.user.name,
  //             project: results.rows[0],
  //             isAuthenticated: req.user
            
  //           });
  //       });
  // }
  
  