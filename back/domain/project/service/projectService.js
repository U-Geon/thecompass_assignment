const Project = require('../schema/project');
const projectDTO = require("../dto/response/projectDTO");

exports.create = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const project = new Project({
            title: title,
            description: description,
            tasks: []
        });

        await project.save();
        return res.status(201).json(new projectDTO(project));
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const projects = await Project.find();
        const response = projects.map(project => new projectDTO(project));
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate('tasks');

        if (!project) {
            return res.status(404).json({ message: '프로젝트가 없습니다.' });
        }

        // tasks가 비어 있으면 빈 배열로 설정
        if (!project.tasks) {
            project.tasks = [];
        }

        // 프로젝트를 DTO로 변환해서 반환
        return res.status(200).json(new projectDTO(project));
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


exports.deleteOne = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: '프로젝트가 없습니다.' });
        }

        if(project.tasks.length > 0) {
            return res.status(500).json({ message: '태스크가 남아 있어서 프로젝트를 삭제할 수 없습니다.' });
        }

        await Project.deleteOne(project);

        return res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error);
    }
};
