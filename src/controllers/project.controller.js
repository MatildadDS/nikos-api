const project = require("../models/project.model") 

exports.createOne = (request, response) => {
    let {creation_date, body_area, size, body_picture, tattoo_owner, tattoo_picture, description_txt, description_img, description_nikos_ttt, activity, city, country, drawing_session, tattoo_session, customer_id} = request.body;
    const {username} = request.username;
    if (!username) {
        response.status(401).json({message: "User not connected"})
    }
    // else if (role === "guest") {
    //     response.status(403).json({message: "Access denied"})
    // }
        else {
            if (!body_area || !size || !body_picture || !tattoo_owner || !description_txt ||!description_nikos_ttt || !activity || !city || !country || !drawing_session || !tattoo_session || !customer_id ) {
                response.status(400).json({message: "Missing input"})
            }
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
    const {id_customer} = request.body;
    project.getDetails (id_project, (error, project_info) => {
    if (id_customer !== projet_info.customer_id) {
        response.status(403).json({message: "Vous n'êtes pas autorisé à accéder à cette ressource"})
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