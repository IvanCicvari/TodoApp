import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.scss";
import { Task } from "../types";
import AddTaskPopup from "./AddTaskPopup";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [dueDate, setDueDate] = useState("");
  const [apiCount, setApiCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"priority" | "timestamp" | "done">("priority");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const openAddTaskWindow = () => {
    setIsOpen(true);
  };

  const closeAddTaskWindow = () => {
    setIsOpen(false);
  };

  const handleAddTask = () => {
    // Validate inputs
    if (taskInput.trim() === '' || dueDate.trim() === '' || !priority) {
      alert('Please fill in all fields'); // Alert if any field is empty
      return;
    }
  
    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      done: false,
      priority, // Add priority to the task
      dueDate, // Add dueDate to the task
      fromApi: false, // Mark as manually added
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  
    setTasks([...tasks, newTask]);
    setTaskInput(''); // Clear the input
    setDueDate(''); // Clear dueDate
    closeAddTaskWindow(); // Close the popup after adding the task
  };
  const handleFetchTasks = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/todos?limit=${apiCount}`);
      const data = await response.json();
      const newTasks = data.todos.map((task: any) => ({
        ...task,
        fromApi: true,
      }));
      setTasks([...tasks, ...newTasks]);
      alert("Tasks added successfully");
    } catch (error) {
      console.error("Error fetching tasks", error);
      alert("Failed to add tasks");
    }
  };

  const handleDeleteAll = () => setTasks([]);
  const handleDeleteManual = () => setTasks(tasks.filter((task) => task.fromApi));
  const handleDeleteApi = () => setTasks(tasks.filter((task) => !task.fromApi));

  const sortedTasks = tasks.slice().sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = ["Low", "Medium", "High"];
        return (
          priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
        );
      case "timestamp":
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      case "done":
        return Number(b.done) - Number(a.done);
      default:
        return 0;
    }
  });

  return (
    <div className={styles.todoList}>
      <header>
        <h1>My To-Do App - by Ivan Cicvarić</h1>
      </header>
      
      <div className="newTaskContainer">
        <button onClick={openAddTaskWindow}>Add New Task</button>
      </div>
      <button onClick={() => setIsDarkMode(prevMode => !prevMode)}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="apiTaskContainer">
        <input
          type="number"
          onChange={(e) => setApiCount(Number(e.target.value))}
          placeholder="Number of tasks from API"
        />
        <button onClick={handleFetchTasks}>Fetch Tasks</button>
      </div>
      <div className="sortingContainer">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "priority" | "timestamp" | "done")}
        >
          <option value="priority">Priority</option>
          <option value="timestamp">Date Added</option>
          <option value="done">Completion Status</option>
        </select>
      </div>
      <button onClick={handleDeleteAll}>Delete All Tasks</button>
      <button onClick={handleDeleteManual}>Delete Manual Tasks</button>
      <button onClick={handleDeleteApi}>Delete API Tasks</button>
      <div>
        <p>Completed tasks: {tasks.filter((task) => task.done).length}</p>
      </div>
      <div className={styles.taskContainer}>
        {sortedTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() =>
              setTasks(
                tasks.map((t) =>
                  t.id === task.id ? { ...t, done: !t.done } : t
                )
              )
            }
            onRemove={() => setTasks(tasks.filter((t) => t.id !== task.id))}
          />
        ))}
      </div>
      <AddTaskPopup
        isOpen={isOpen}
        taskInput={taskInput}
        dueDate={dueDate} // Pass dueDate
        priority={priority}
        setTaskInput={setTaskInput}
        setPriority={setPriority}
        setDueDate={setDueDate} // Pass setDueDate
        handleAddTask={handleAddTask}
        closeAddTaskWindow={closeAddTaskWindow}
      />
    </div>
  );
};

export default TodoList;
