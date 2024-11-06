class projectDTO {
    constructor(project) {
        this.id = project._id;
        this.title = project.title;
        this.description = project.description;
        this.tasks = project.tasks;
    }
}

module.exports = projectDTO;