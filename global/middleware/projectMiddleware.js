const Project = require("../../domain/project/schema/project");
const mongoose = require("mongoose");

exports.validateProjectId = async (req, res, next) => {
    const projectId = req.params.projectId;

    console.log(projectId)

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: '프로젝트가 없습니다.' });
        }

        req.project = project;
        next();
    } catch (err) {
        return res.status(400).json({ message: '잘못된 프로젝트 ID입니다.' });
    }
};