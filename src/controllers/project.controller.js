const { result } = require("lodash");
const project = require("../models/project.model") 
const { projectValidation } = require('../validators')

exports.createOne = (request, response) => {
    const errors = projectValidation(request.body)
        if (errors.length > 0 ) {
            response.status(400).json({errors})
        }
        else {
            const project = {...request.body, customer_id : request.user.customer_id, creation_date: Date.now()}
            project.addOne (project, (error, result) => {
                if (error) {
                    response.send (error.message);
                }
                else {
                    if (tattoo_picture) {
                        project.addTattooPicture(request.body, result[0].id_project, (error, result) => {
                            if (error) {
                                response.send (error.message);
                            }
                        })
                    }
                    if (description_img) {
                        project.addDescriptionImg(request.body, result[0].id_project, (error, result) => {
                            if (error) {
                                response.send (error.message);
                            }
                        })
                    }
                    response.status(201).json({message: "Project completed successfully!"})
                }  
            })
        }
    }

exports.getProjects = (request,response) => {
    user.getAllProjects ((error, projects) =>{
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
    if (id_customer !== projet_info.customer_id) {
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
    const {username} = request.username;    
    if (!username) {
        response.status(401).json({message: "User not connected"})
    }
    // else if (role === "guest") {
    //     response.status(403).json({message: "Vous n'êtes pas autorisé à accéder à cette ressource"})
    // }
    else {
        project.deleteBooking (id_project,  (error, result)=>{
            if (error) {
                response.send (error.message);
            }
            else {
                project.delete(id_project, (error, result) => {
                    if (error) {
                    response.send (error.message);
                    }
                    else {
                    response.status(200).json({message: "project deleted", result});
                    }
                })
            }
        })       
    }
}
