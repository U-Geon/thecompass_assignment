const Task = require("../schema/task");
const taskDTO = require("../dto/response/taskDTO");

// create 함수
exports.create = async (req, res) => {
    try {
        const { pjId, title, description, priority, dueDate } = req.body;
        const project = req.project;

        // projectId와 pjId 일치 여부 확인
        if (pjId !== project._id.toString()) {
            return res.status(400).json({ message: '경로 변수의 ID가 유효하지 않습니다.' });
        }

        const newTask = new Task({
            pjId: project._id,  // project._id로 설정
            title,
            description,
            priority,
            dueDate,
            status: 'not-started'
        });

        const savedTask = await newTask.save();

        project.tasks.push(savedTask);
        await project.save();

        return res.status(201).json(new taskDTO(savedTask));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tasks = await Task.find({ pjId: req.project._id });
        const taskDTOs = tasks.map(task => new taskDTO(task));
        return res.status(200).json(taskDTOs);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;
        const task = req.task;

        // 필드 업데이트
        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        const updatedTask = await task.save();
        return res.status(200).json(new taskDTO(updatedTask));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const project = req.project;
        const task = req.task;

        // 프로젝트의 태스크 목록에서 해당 태스크 ID 제거
        project.tasks = project.tasks.filter(t => t.toString() !== task._id.toString());
        await project.save();

        // 태스크 삭제
        await Task.deleteOne(task);

        return res.status(200).json({ message: 'success' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
