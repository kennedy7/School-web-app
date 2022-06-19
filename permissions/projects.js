
function canViewProject (user, project){
    return (
        user.role === req.user.role || 
        project.userId === projects.userid
    )
}




module.exports = { canViewProject}