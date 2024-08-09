// src/types/AddTaskPopup.d.ts
interface AddTaskPopupProps {
    isOpen: boolean;
    taskInput: string;
    dueDate: string; // Add this field
    priority: 'Low' | 'Medium' | 'High';
    setTaskInput: (value: string) => void;
    setPriority: (value: 'Low' | 'Medium' | 'High') => void;
    setDueDate: (date: string) => void; // Add this setter function
    handleAddTask: () => void;
    closeAddTaskWindow: () => void;
  }
  