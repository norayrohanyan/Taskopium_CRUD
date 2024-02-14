import { Request, Response } from 'express';
import TaskService from "../services/taskService"

class TaskController {
    static async createTask(req: Request, res: Response) {
        const taskDetails = req.body;
        const task = await TaskService.createTask(taskDetails);
        res.status(201).json(task);
    }

    static async getTasks(req: Request, res: Response) {
        try {
            const tasks = await TaskService.getTasks();
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get tasks' });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get task' });
        }
    }

    static async editTask(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const { data } = req.body;
            const task = await TaskService.editTask(taskId, data);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to edit task' });
        }
    }

    static async deleteTask(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            await TaskService.deleteTask(taskId);
            res.status(200).json({ message: 'Task deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }

    static async addComment(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const { data } = req.body;
            const task = await TaskService.addComment(taskId, data);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to add comment' });
        }
    }
}

export default TaskController;