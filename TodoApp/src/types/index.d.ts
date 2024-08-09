// src/types/Task.d.ts
export interface Task {
    id: number;
    text: string;
    done: boolean;
    priority: 'Low' | 'Medium' | 'High';
    dueDate: string; // Add this field
    fromApi?: boolean;
    timestamp: string;
  }
  