const project = require("../models/project.model") 

exports.createProject = (request, response) => {

            const projectUser = {...request.body, customer_id : request.user.id_customer}
            project.addOne (projectUser, (error, result) => {
                if (error) {
                    response.send (error.message);
                }
                else {
                    response.status(201).json({message: "Project completed successfully!"})
                }  
            })
}

exports.getProjects = (request,response) => {
    const {id_customer} = request.user
    project.getAllProjects (id_customer, (error, projects) =>{
        if (error) {
            response.send(error.message);
        }
        else {
            response.status(200).json({projects: projects})
        }
    })
}

exports.projectDetails = (request, response) => {
    const {id_project} = request.params
    project.getDetails (id_project, (error, project_info) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({"project": project_info});
        }
    })
}

exports.updateProject = (request, response) => {
    const {id_project} = request.params;
    const {id_customer} = request.body
    project.getDetails (id_project, (error, project_info) => {
    if (id_customer !== project_info.customer_id) {
        response.status(403).json({message: "You are not authorized to access this resource"})
    }
    else {
        project.modifyProjectInfos(id_project, request.body, (error, result) => {
            if (error) {
                response.send (error.message);
            }
            else {
                response.status(200).json({message: "update ok", result});
            }
        })
        }
    })
}

exports.deleteProject = (request, response) => {
    const {id_project} = request.params;
    const {id_customer} = request.user;    
    if (!id_customer) {
        response.status(401).json({message: "User not connected"})
    }
    else {
        project.deleteProject (id_project,  (error, result)=>{
            if (error) {
                response.send (error.message);
            }
            else {
                response.status(200).json({message: "project deleted", result});
            }
        })
    }
} 

exports.deleteAllProjects = (request, response) => {
    const {id_customer} = request.user;    
    if (!id_customer) {
        response.status(401).json({message: "User not connected"})
    }
    else {
        project.deleteAllProjects (id_customer,  (error, result)=>{
            if (error) {
                response.send (error.message);
            }
            else {
                response.status(200).json({message: "All projects are removed successfully", result});
            }
        })
    }
}
    
