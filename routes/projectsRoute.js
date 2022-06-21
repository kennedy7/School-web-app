const express = require('express')
const projectRouter = express.Router()
const {
    AddProject, GetStudentProject, EditProject, UpdateProject
} = require('../controls/projectsControls')

const {
    authUser
} = require('../basicAuth')
const {
    canViewProject
} = require('../permissions/projects')
const {
    pool
} = require('../dbConfig')

projectRouter.get('/users/newproject', authUser, (req, res) => {
    res.render('Newproject', {
        userId: req.user.id
    })
})
projectRouter.post('/users/newproject', authUser, AddProject)

projectRouter.get('/users/projectlist', authUser, (req, res) => {
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

})

projectRouter.get('/users/projects/:id', authUser, GetStudentProject)

projectRouter.get('/edit/:id', authUser, EditProject);

projectRouter.post('/update/:id', authUser, UpdateProject);

projectRouter.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    pool.query(`DELETE from projects where id = $1`,
      [id],
      (err, results) => {
        res.redirect('/users/projectlist')
      })
  
  })

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Access denied')
    }
    next()
}

module.exports = {
    projectRouter
}