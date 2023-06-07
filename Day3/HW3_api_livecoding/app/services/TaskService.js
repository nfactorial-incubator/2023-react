import axios from "axios";

const TODO_API = 'https://api.todoist.com/rest/v1/tasks'
const TODOIST_TOKEN = process.env.TODOIST_TOKEN
const PROJECT_ID = 'your project id'

class TaskService {
    static async getAllTasks(){
        // ваша реализация получения тудушек
    }   
    static async getTaskById(id){
        // ваша реализация получения одной тудушки
    }   
    static async createNewTask(task){
        // ваша реализация создания новой тудушки
    }
    static async updateNewTask(id, task){
        // ваша реализация обновления существующей тудушки по ID
    }
    static async deleteNewTask(id){
        // ваша реализация удаления существующей тудушки по ID
    }
}

export default TaskService;