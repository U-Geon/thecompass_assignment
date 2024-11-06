const {create, findAll, update, deleteOne} = require("../service/taskService");
const {validateProjectId} = require("../../../global/middleware/projectMiddleware");
const {validateTaskId} = require("../../../global/middleware/taskMiddleware");
const taskRouter = require('express').Router();

taskRouter.route('/projects/:projectId/tasks')
    .post(validateProjectId, create)
    .get(validateProjectId, findAll)

taskRouter.route('/projects/:projectId/tasks/:taskId')
    .put(validateProjectId, validateTaskId, update)
    .delete(validateProjectId, validateTaskId, deleteOne)

module.exports = taskRouter;