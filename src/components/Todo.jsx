import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

const Todo = () => {
    const tasks = [
        {className: 'todo__item', id: 'task-1', title: 'Изучить React', isDone: false},
        {className: 'todo__item', id: 'task-2', title: 'Изучить C#', isDone: true},
    ]

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm/>
            <SearchTaskForm/>
            <TodoInfo total={tasks.length} done={tasks.filter((task) => task.isDone === true).length} />
            <TodoList tasks={tasks}/>
        </div>
    )
}

export default Todo