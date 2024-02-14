import TaskModel from "../models/task";
import { loadTasksFromDB, saveTasksToDB } from '../config/taskDB';
import { Comment } from "../interfaces/commentInterface";

class TaskService {
    static async createTask(data: TaskModel): Promise<TaskModel | null> {
        try {
            const task: TaskModel = new TaskModel(data);
            const tasks: TaskModel[] = loadTasksFromDB();
            tasks.push(task);
            saveTasksToDB(tasks);
            return task;
        }
        catch (error) {
            console.error('Error creating task:', error);
            throw error;
       }
    }

    static async getTasks(): Promise<TaskModel[]> {
        try {
            return loadTasksFromDB();
        }
        catch (error) {
            console.error('Error getting tasks:', error);
            return [];
        }
    }

    static async getTaskById(taskId: string): Promise<TaskModel | null> {
        const tasks = loadTasksFromDB();
        return tasks.find(task => task.taskId === taskId) || null;
    }

    static async editTask(taskId: string, data: Partial<TaskModel>): Promise<TaskModel | null> {
        try {
            const tasks: TaskModel[] = loadTasksFromDB();
            const taskIndex: number = tasks.findIndex(task => task.taskId === taskId);
            if (taskIndex == -1) {
                return null;
            }
            const task: TaskModel = tasks[taskIndex];
            const updatedTask: TaskModel = new TaskModel(task);
            console.log(updatedTask)
            updatedTask.update(data);
            // updatedTask.setPriority(data.priority || task.priority);
            // updatedTask.changeStatus(data.status || task.status);
            tasks[taskIndex] = updatedTask;
            saveTasksToDB(tasks);
            return updatedTask;
        }
        catch (error) {
            console.error('Error editing task:', error);
            throw error;
        }
    }

    static async deleteTask(taskId: string): Promise<void> {
        try {
            const tasks: TaskModel[] = loadTasksFromDB();
            const index : number = tasks.findIndex(task => task.taskId === taskId);
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTasksToDB(tasks);
            }
        }
        catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }

    static async addComment(taskId: string, comment: Comment): Promise<TaskModel | null> {
        try {
            const tasks: TaskModel[] = loadTasksFromDB();
            const taskIndex: number = tasks.findIndex(task => task.taskId === taskId);
            if (taskIndex === -1) {
                return null;
            }
            const task: TaskModel = tasks[taskIndex];
            task.addComments(comment);
            saveTasksToDB(tasks);
            return new TaskModel(task);
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
}

export default TaskService;
