const projectRouter = require('express').Router();
const { create, findAll, findOne, deleteOne } = require("../service/projectService");

projectRouter.route('/')
    .post(create)
    .get(findAll);

projectRouter.route('/:projectId')
    .get(findOne)
    .delete(deleteOne);

module.exports = projectRouter;