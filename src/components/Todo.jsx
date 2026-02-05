import {useState, useEffect} from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

const Todo = () => {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            return JSON.parse(savedTasks)
        }

        return [
            {className: 'todo__item', id: 'task-1', title: 'Изучить React', isDone: false},
            {className: 'todo__item', id: 'task-2', title: 'Изучить C#', isDone: true},
        ]
    });

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want delete all tasks?')
        if (isConfirmed) {
            setTasks([]);
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id !== taskId) {
                return {...task, isDone}
            }

            return task;
        }))
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setSearchQuery('');
        }
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo total={tasks.length}
                      done={tasks.filter((task) => task.isDone === true).length}
                      onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList tasks={tasks}
                      filteredTasks={filteredTasks}
                      onDeleteTaskButtonClick={deleteTask}
                      onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default Todo