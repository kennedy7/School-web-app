const express = require('express')
const projectRouter = express.Router()
const { AddProject, GetStudentProject, EditProject, UpdateProject, GetProjectList, DeleteProject} = require('../controls/projectsControls')
const { authUser} = require('../basicAuth')
const {canViewProject} = require('../permissions/projects')
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

projectRouter.delete('/delete/:id', DeleteProject)

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