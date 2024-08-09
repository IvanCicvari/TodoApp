import React from 'react';
import styles from '../styles/TodoItem.module.scss'; // Ensure the path is correct
import { Task } from '../types/index';

interface TodoItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
  dueDate: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onRemove }) => {
  let priorityClass = '';

  // Assign a class based on the task priority
  switch (task.priority) {
    case 'Low':
      priorityClass = styles.priorityLow;
      break;
    case 'Medium':
      priorityClass = styles.priorityMedium;
      break;
    case 'High':
      priorityClass = styles.priorityHigh;
      break;
    default:
      priorityClass = '';
  }

  return (
    <div className={`${styles.todoItem} ${task.done ? styles.done : ''} ${task.fromApi ? styles.apiTask : styles.manualTask} ${priorityClass}`}>
      <input type="checkbox" checked={task.done} onChange={onToggle} />
      <div>
        <span>{task.text}</span>
        <small className={styles.timestamp}>Added on: {task.timestamp}</small>
        <small className={styles.timestamp}>Due date on: {task.dueDate}</small>
        <span className={styles.priorityLabel}>{task.priority}</span> {/* Display priority */}
      </div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default TodoItem;
