class taskDTO {
    constructor(task) {
        this.id = task._id;
        this.pjId = task.pjId;
        this.title = task.title;
        this.description = task.description;
        this.priority = task.priority;
        this.dueDate = task.dueDate;
        this.status = task.status;
    }
}

module.exports = taskDTO;