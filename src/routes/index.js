// OUTILS
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const projectController = require("../controllers/project.controller");
const isAuth = require("../middlewares/isAuth");

//GET
router.get("/", userController.home);
router.get('/projects', isAuth, projectController.getProjects);
router.get("/projects/:id_project", isAuth, projectController.projectDetails);

//POST
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/projects", isAuth,  projectController.createProject);

// PUT
router.put("/projects/:id_project", isAuth, projectController.updateProject);

// DELETE
router.delete('/projects/:id_project', isAuth, projectController.deleteProject);
router.delete('/projects', isAuth, projectController.deleteAllProjects);

// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

// Exportation router
module.exports = router;
