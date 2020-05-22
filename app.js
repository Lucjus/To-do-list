class Validator {
    static validate(value, maxValue) {
        if (value === '' || value > maxValue) {
            return true
        }
    }

}

class InputHandler {
    constructor() {
        this.taskText = document.querySelector('.add-task-input')
        this.listResult = document.querySelector('.active')
        this.message = document.querySelector('.message')
        this.addTaskBtn = document.querySelector('.btn-add-task').addEventListener('click', this.addTaskHandler.bind(this))
        this.activeTasks = []
        this.deletedTasks = []
        this.finishedTasks = []
        this.deletedTasksNumber = document.querySelector('.deleted')
        this.activeTasksNumber = document.querySelector('.active-n')
        this.finishedTasksNumber = document.querySelector('.finished')
        this.deletedTaskBox = document.querySelector('.deleted-tasks').addEventListener('click', this.renderDeletedTasks.bind(this))
        this.activeBox = document.querySelector('.active-tasks').addEventListener('click', this.display.bind(this))
        this.deletedDiv = document.querySelector('.deleted-div')
        this.finishedDiv = document.querySelector('.finished-div')
        this.finishedTasksBox = document.querySelector('.finished-tasks').addEventListener('click', this.renderFinishedTasks.bind(this))
    }


    display() {
        this.listResult.style.display = 'block'
        this.deletedDiv.style.display = 'none'
        this.finishedDiv.style.display = 'none'
    }

    addTaskHandler() {

        if (Validator.validate(this.taskText.value, 20)) {
            alert('Your task must be something!')
            return
        }
        this.createTask()


    }


    createTask() {
        this.userInput = this.taskText.value
        const task = document.createElement('li')
        this.message.style.display = 'none'
        task.innerHTML = `
            <li class="task">
                        <div class="task-container">
                            <div class="white-background">
                                <p class="task-info">${this.userInput}</p>
                            </div>
                            <div class="delete-task"> <i class="fas fa-trash"></i></div>
                            <div class="complete-task"><i class="fas fa-check"></i></div>
                        </div> 
        
            `

        const deleteBtn = task.querySelector('.delete-task')
        deleteBtn.addEventListener('click', this.deleteTask.bind(this))
        const completeBtn = task.querySelector('.complete-task')
        completeBtn.addEventListener('click', this.completeTask.bind(this))
        list.appendChild(task)
        this.activeTasks.push(task)
        this.activeTasksNumber.textContent = this.activeTasks.length
        this.taskText.value = ''
        console.log(this.activeTasks)
    }


    deleteTask(e) {

        this.deletedTasks.push(e.target.parentElement.parentElement.parentElement)
        console.log(this.deletedTasks)
        this.deletedTasksNumber.textContent = this.deletedTasks.length
        e.target.parentElement.parentElement.parentElement.remove()
        this.activeTasks.shift()
        this.activeTasksNumber.textContent = this.activeTasks.length
        if (this.activeTasks.length === 0) {
            this.message.style.display = 'block'
        } else {
            this.message.style.display = 'none'
        }


    }

    completeTask(e) {
        e.target.parentElement.style.opacity = '0.5'
        this.finishedTasks.push(e.target.parentElement.parentElement.parentElement)
        this.finishedTasksNumber.textContent = this.finishedTasks.length
        e.target.parentElement.parentElement.parentElement.remove()
        this.activeTasks.shift()

        this.activeTasksNumber.textContent = this.activeTasks.length
        console.log(this.finishedTasks)
        if (this.activeTasks.length === 0) {
            this.message.style.display = 'block'
        }
    }

    renderDeletedTasks() {
        this.listResult.style.display = 'none'
        this.deletedDiv.style.display = 'block'
        this.finishedDiv.style.display = 'none'

        for (const task of this.deletedTasks) {
            task.innerHTML =
                `<li class="task">
<div class="task-container">
    <div class="white-background">
        <p class="task-info">${this.userInput}</p>
    </div>
    <div class = 'redo-task'><i class="fas fa-redo"></i></div>
 </div> 
`
            deletedTasksList.append(task)
        }


    }

    renderFinishedTasks() {
        this.listResult.style.display = 'none'
        this.deletedDiv.style.display = 'none'
        this.finishedDiv.style.display = 'block'
        for (const task of this.finishedTasks) {
            finishedTasksList.append(task)
        }
    }
}


class TaskList {

    render() {
        const renderHook = document.querySelector('.active')
        const list = document.createElement('ul')
        list.classList.add('tasks-list')
        renderHook.append(list);
        return list
    }

    renderDeletedTaskList() {
        const renderHook = document.querySelector('.deleted-div')
        const deletedTasksList = document.createElement('ul')
        renderHook.style.display = 'none'
        deletedTasksList.classList.add('tasks-list')
        renderHook.append(deletedTasksList);
        return deletedTasksList
    }

    renderFinishedTaskList() {
        const renderHook = document.querySelector('.finished-div')
        const finishedTasksList = document.createElement('ul')
        renderHook.style.display = 'none'
        finishedTasksList.classList.add('tasks-list')
        renderHook.append(finishedTasksList);
        return finishedTasksList
    }

}




new InputHandler()
const l = new TaskList()
const list = l.render()
const deletedTasksList = l.renderDeletedTaskList()
const finishedTasksList = l.renderFinishedTaskList()