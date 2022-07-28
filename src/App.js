import {useState, useEffect} from "react";

import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState("");
    const [inputEditTask, setInputEditTask] = useState("");

    function handleAddTask() {
        setTasks([...tasks, {id: Math.floor(Math.random() * 100000000), name: inputTask}]);
        document.getElementById("input").value = "";
    }

    function handleDeleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function handleShowEditTask(id) {
        const newTasks = tasks.map((task) => {
            return task.id === id ? {...task, showEditForm: !task.showEditForm} : task;
        });

        setTasks(newTasks);
    }

    function handleEditTaskName(id, name) {
        const newTasks = tasks.map((task) => {
            return task.id === id ? {...task, name: name} : task;
        });

        setTasks(newTasks);
    }

    function handleFavoriteTask(id) {
        const newTasks = tasks.map((task) => {
            return task.id === id ? {...task, fav: !task.fav} : task;
        });
        setTasks(newTasks);
    }

    useEffect(() => {
        document.title = `${tasks.length} Tasks`;
    });

    useEffect(() => {}, []);

    return (
        <div className="App">
            <input type="text" id="input" onChange={(e) => setInputTask(e.target.value)} />
            <button onClick={handleAddTask}>Adicionar Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.id} - {task.name} {task.fav === true && <span>fav</span>}
                        <button onClick={() => handleDeleteTask(task.id)}>Deletar</button>
                        <button onClick={() => handleFavoriteTask(task.id)}>Fav</button>
                        {task.showEditForm !== true && <button onClick={() => handleShowEditTask(task.id)}>Editar</button>}
                        {task.showEditForm === true && (
                            <div>
                                <input type="text" placeholder={task.name} onChange={(e) => setInputEditTask(e.target.value)} />
                                <button onClick={() => handleEditTaskName(task.id, inputEditTask)}>Ok</button>
                                <button onClick={() => handleShowEditTask(task.id)}>Editar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
