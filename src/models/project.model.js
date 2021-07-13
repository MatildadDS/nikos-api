const database = require('../config/db');

exports.addOne = (project, callback) => {
    database.query(`INSERT INTO project (id_project, creation_date, body_area, size, body_picture, tattoo_owner,tattoo_picture, description_txt, description_img, description_nikos_ttt, activity, city, country, drawing_session, tattoo_session, customer_id) VALUES (${project.id_project}, ${project.creation_date}, "${project.body_area}", "${project.size}", "${project.body_picture}", ${project.tattoo_owner}, ${project.tattoo_picture}, ${project.description_txt}, ${project.description_img}, ${project.description_nikos_ttt}, ${project.activity}, ${project.city}, ${project.country}, ${project.drawing_session}, ${project.tattoo_session}, ${project.customer_id});`, (error, result) => {

        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.getAllProjects = (callback) =>{
    database.query("SELECT * FROM project;", (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.getProjectDetails = (id, callback) => {
    database.query(`SELECT * from project where id_project=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.deleteProject = (id,  callback) => {
    database.query(`DELETE  FROM project WHERE id_project = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}

exports.modifyProjectInfos = (id, datas, callback) => {
    database.query(`UPDATE project SET body_area="${datas.body_area}", size="${datas.size}", body_picture="${datas.body_picture}", tattoo_owner="${datas.tattoo_owner}", tattoo_picture="${datas.tattoo_picture}", description_txt="${datas.description_txt}", description_img="${datas.description_img}", description_nikos_ttt="${datas.description_nikos_ttt}", activity="${datas.activity}", city="${datas.city}", country="${datas.country}", drawing_session="${datas.drawing_session}", tattoo_session="${datas.tattoo_session}" WHERE id_project=${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}
