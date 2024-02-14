const createTaskCard = (task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const updateButton = document.createElement('button');
    updateButton.innerText = 'Edit'; 

    Object.entries(task).forEach(([key, value]) => {
        if (key === 'comments') {
            const commentsSection = document.createElement('div');
            commentsSection.classList.add('comments-section');
            commentsSection.innerHTML = '<h4>Comments:</h4>';
        
            value.forEach((comment, index) => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
        
                let commentHTML = '';
                for (const key in comment) {
                    if (comment.hasOwnProperty(key)) {
                        if (key === 'text') {
                            commentHTML += `<p>${key}: ${comment[key]}</p>`;
                        } else {
                            commentHTML += `<p>${key}: ${comment[key]}</p>`;
                        }
                    }
                }
        
                commentElement.innerHTML = commentHTML;
                commentsSection.appendChild(commentElement);
            });
        
            taskElement.appendChild(commentsSection);
        } else {
            const propertyElement = document.createElement('p');
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = value;
            inputField.id = `task_${key}`;
            inputField.readOnly = true; 
            propertyElement.innerHTML = `<strong>${key}:</strong> `;
            propertyElement.appendChild(inputField);
            taskElement.appendChild(propertyElement);

            if (updateButton.innerText === "Edit") {
                updateButton.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    inputField.readOnly = !inputField.readOnly;
                    updateButton.innerText = inputField.readOnly ? 'Edit' : 'Save';
                });
            } else {
                updateButton.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    const updatedData = { [key]: inputField.value };
                    updateTask(task.taskId, updatedData); 
                    inputField.readOnly = true;
                    updateButton.innerText = 'Edit';
                });
            }
        }
    });

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('actions');

    actionsContainer.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        deleteTask(task.taskId); 
    });
    actionsContainer.appendChild(deleteButton);

    const addCommentInput = document.createElement('input');
    addCommentInput.type = 'text';
    addCommentInput.placeholder = 'Add comment...';

    const addCommentButton = document.createElement('button');
    addCommentButton.innerText = 'Add Comment';
    addCommentButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        addComment(task.taskId, addCommentInput.value); 
    });
    
    actionsContainer.appendChild(addCommentInput);
    actionsContainer.appendChild(addCommentButton);

    taskElement.appendChild(actionsContainer);

    return taskElement;
};




async function addComment(taskId, text) {
    try {
        const response = await fetch(`http://localhost:3001/api/task/${taskId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ data: {
                    author: "UserX",
                    text: text
                } 
            }),
        });
        const data = await response.json();
        console.log(data);
        loadTasks();
    } catch (error) {
        console.error('Error adding comment:', error.message);
    }
}
const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const id = formData.get('Id');
    const title = formData.get('title');
    const description = formData.get('description');
    const deadline = formData.get('deadline');
    const priority = formData.get('priority');
    const status = formData.get('status');
    const assignee = formData.get('assignee');
    const creator = formData.get('creator');
    const tags = formData.get('tags').split(',').map(tag => tag.trim());
    const creationDate = formData.get('creationDate');
    const lastUpdated = formData.get('lastUpdated');
    const estimatedTime = formData.get('estimatedTime');
  
    try {
        const response = await fetch('http://localhost:3001/api/task/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id,
                title, 
                description, 
                deadline, 
                priority, 
                status, 
                assignee, 
                creator, 
                tags, 
                creationDate, 
                lastUpdated, 
                estimatedTime 
            }),
        });
        const data = await response.json();
        console.log(data); 
        loadTasks();
    } catch (error) {
        console.error('Error creating task:', error.message);
    }
};
  
async function loadTasks() {
    try {
        const res = await fetch('http://localhost:3001/api/task/get');
        const tasks = await res.json();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; 

        tasks.forEach((task) => {
            const taskElement = createTaskCard(task);
            taskList.appendChild(taskElement);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
    }
};

async function deleteTask(taskId) {
    try {
        const res = await fetch(`http://localhost:3001/api/task/delete/${taskId}`, {
            method: 'DELETE',
        });
        loadTasks();
    } catch(error) {
        console.error('Error deleting task:', error.message);
    }
}

async function updateTask(taskId, data) {
    try {
        const response = await fetch(`http://localhost:3001/api/task/edit/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const updatedTask = await response.json();

        Object.entries(data).forEach(([key, value]) => {
            const inputField = document.getElementById(`task_${key}`);
            if (inputField) {
                inputField.value = value;
            }
        });

        console.log('Updated Task:', updatedTask);
    } catch(error) {
        console.error('Error updating task:', error.message);
    }
}



document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);
document.addEventListener('DOMContentLoaded', loadTasks);
