const express = require('express')
const projectRouter = express.Router()
const { AddProject, GetStudentProject, EditProject, UpdateProject, GetProjectList, DeleteProject} = require('../controls/projectsControls')
const { authUser} = require('../basicAuth')
const {pool} = require('../dbConfig')

projectRouter.get('/users/newproject', authUser, (req, res) => {
    res.render('Newproject', {
        userId: req.user.id
    })
})
projectRouter.post('/users/newproject', authUser, AddProject)

projectRouter.get('/users/projectlist', authUser, GetProjectList)

projectRouter.get('/users/projects/:id', authUser, GetStudentProject)

projectRouter.get('/edit/:id', authUser, EditProject);

projectRouter.post('/update/:id', authUser, UpdateProject);

projectRouter.delete('/delete/:id', authUser, authDeleteProject, DeleteProject)

function authDeleteProject(req, res, next){
    const id = req.params.id
    pool.query(`select * from projects where id = $1`, [id],
    (err, results)=>{
    if (req.user.id !== results.rows[0].userid) {
        req.flash("success_msg", "only the Creator of a project can delete it");
       return res.redirect("/users/projectlist");
    }
    next()
})
}

module.exports = {
    projectRouter
}