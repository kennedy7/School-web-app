const {pool} = require('../dbConfig')


exports.AddProject = function (req, res) {
  const {
    userId,
    department,
    level,
    title,
    content,
    summary
  } = req.body
  console.log({
    userId,
    department,
    title,
    content,
    summary
  })
  pool.query(
    `INSERT into projects (userId, department, level, title, content, summary) VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, department, level, title, content, summary],
    (err, results) => {
      if (err) {
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
      res.render('ProjectsDetails.ejs', {
        user: req.user.name,
        project: results.rows[0],

      });
    });
}

exports.EditProject = function (req, res) {
  var id = req.params.id;
  pool.query(
    'SELECT * from projects where id= $1',
    [id],
    (err, results) => {
      res.render('edit.ejs', {
        project: results.rows[0]
      });
    });
}

exports.GetProjectList = function (req, res) {
  pool.query(
    `SELECT * from projects`,
    (err, results) => {
      if (req.user.role === 'Admin') {
        return res.render('ProjectsView', {
          user: req.user.name,
          projects: results.rows
        })
      }
      res.render('ProjectsView', {
        user: req.user.name,
        projects: results.rows.filter(result => result.userid === req.user.id)
      })
    }
  )
}

exports.UpdateProject = async function (req, res) {
  await pool.query(
    'UPDATE projects set department=$1, level =$2, title =$3, content = $4, summary= $5 where id =$6',
    [req.body.department,
      req.body.level,
      req.body.title,
      req.body.content,
      req.body.summary,
      req.params.id
    ],
    (err, results) => {
      return res.redirect('/users/projectlist');
    });
}

exports.DeleteProject = function (req, res) {
  var id = req.params.id;
  pool.query(`DELETE from projects where id = $1`,
    [id],
    (err, results) => {
      res.redirect('/users/projectlist')
    })
}
