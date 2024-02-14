import { Router } from 'express';
import TaskController from '../controllers/taskController';

const router = Router();

router.post('/create', TaskController.createTask);
router.get('/get', TaskController.getTasks);
router.get('/get/:taskId', TaskController.getTaskById);
router.put('/edit/:taskId', TaskController.editTask);
router.delete('/delete/:taskId', TaskController.deleteTask);
router.post('/:taskId/comments', TaskController.addComment);

export default router;
