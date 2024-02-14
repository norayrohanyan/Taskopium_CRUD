import fs from 'fs';
import  Task  from '../models/task';

const tasksFilePath = './data/tasks.json';

export const initializeDB = () => {
    try {
        if (!fs.existsSync(tasksFilePath)) {
            fs.writeFileSync(tasksFilePath, '[]');
        }
    }
    catch (error) {
        console.error('Error initializing DB:', error);
    }
};

export const saveTasksToDB = (tasks: Task[]) => {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    }
    catch (error) {
        console.error('Error saving tasks to DB:', error);
    }
};

export const loadTasksFromDB = (): Task[] => {
    try {
        const data: string = fs.readFileSync(tasksFilePath, 'utf-8');
        const tasksData: Task[] = JSON.parse(data);
        const tasks: Task[] = tasksData.map(taskData => new Task(taskData));
        return tasks;
    } catch (error) {
        console.error('Error loading tasks from DB:', error);
        return []; 
    }
};
