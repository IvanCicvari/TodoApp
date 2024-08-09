import React from 'react';
import DatePicker from './DatePicker'; // Import DatePicker component
import styles from '../styles/AddTaskPopup.module.scss';

const AddTaskPopup: React.FC<AddTaskPopupProps> = ({
  isOpen,
  taskInput,
  dueDate,
  priority,
  setTaskInput,
  setPriority,
  setDueDate,
  handleAddTask,
  closeAddTaskWindow
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Add a New Task</h2>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter your task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}>
          <option value="">Select Priority</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <DatePicker selectedDate={dueDate} onDateChange={setDueDate} />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={closeAddTaskWindow}>Close</button>
      </div>
    </div>
  );
};

export default AddTaskPopup;
