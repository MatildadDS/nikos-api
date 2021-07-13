// OUTILS
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const projectController = require("../controllers/project.controller");
const isAuth = require("../middlewares/isAuth");

//GET
router.get("/", controller.home);
router.get('/', projectController.getProjects);
router.get("/project/:id_project", projectController.projectDetails);

//POST
router.post("/signin", controller.login);
router.post("/signup", controller.signup);
router.post("/project", isAuth, projectController.createOne);

// PATCH
router.patch("/project/:id_project", isAuth, projectController.updateProject);

// DELETE
router.delete('/project/:id_project', isAuth, projectController.deleteProject);

// Erreur 404
router.use("*", (request, response) => {
    response.status(404).json({message: "La ressource demandée est introuvable"});
  });

// Exportation router
module.exports = router;