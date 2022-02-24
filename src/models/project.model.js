const database = require('../config/db');

exports.addOne = (project, callback) => {
    console.log(project)
    database.query(`INSERT INTO project (creation_date, body_area, size, description_txt, customer_id, title) VALUES (now(), "${project.body_area}", "${project.size}", "${project.description_txt}", ${project.customer_id}, "${project.title}");`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.getAllProjects = (id, callback) =>{
    database.query(`SELECT * FROM project WHERE customer_id=${id};`, (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.getDetails = (id, callback) => {
    database.query(`SELECT * from project WHERE id_project=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.modifyProjectInfos = (id, datas, callback) => {
    database.query(`UPDATE project SET title="${datas.title}", body_area="${datas.body_area}", size="${datas.size}", description_txt="${datas.description_txt}" WHERE id_project=${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
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

exports.deleteAllProjects = (id,  callback) => {
    database.query(`DELETE  FROM project WHERE customer_id = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}



// exports.addTattooPicture = (project, id, callback) => {
//     database.query(`UPDATE project SET tattoo_picture="${project.tattoo_picture}" WHERE id_project=${id};`, (error, result) => {
//         if (error) {
//             console.log("error :", error);
//             callback(error, null);
//             return;
//         } 
//         callback(null, result);
//     })
// }

// exports.addDescriptionImg = (project, id, callback) => {
//     database.query(`UPDATE project SET description_img="${project.description_img}" WHERE id_project=${id};`, (error, result) => {
//         if (error) {
//             console.log("error :", error);
//             callback(error, null);
//             return;
//         } 
//         callback(null, result);
//     })
// }