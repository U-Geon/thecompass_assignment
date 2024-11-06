const Task = require("../../domain/task/schema/task");

exports.validateTaskId = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: '태스크가 없습니다.' });
        }

        req.task = task;
        next();
    } catch (err) {
        return res.status(400).json({ message: '잘못된 태스크 ID입니다.' });
    }
};