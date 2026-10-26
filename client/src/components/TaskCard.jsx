import React from 'react';
import { deleteTaskFromApi, toggleTaskImportance, updateTaskStatus } from '../services/api';
import { Check, Star, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onTaskUpdated }) => {
  const handleToggle = async () => {
    try { await updateTaskStatus(task.id, !task.completed); onTaskUpdated(); }
    catch (err) { console.error('Error updating task:', err); }
  };
  const handleImportance = async () => {
    try { await toggleTaskImportance(task.id, !task.important); onTaskUpdated(); }
    catch (err) { console.error('Error updating task importance:', err); }
  };
  const handleDelete = async () => {
    try { await deleteTaskFromApi(task.id); onTaskUpdated(); }
    catch (err) { console.error('Error deleting task:', err); }
  };
  return (
    <div className={`task-card-v2 animate-fade ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <button className={`custom-checkbox ${task.completed ? 'checked' : ''}`} onClick={handleToggle} aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}>
          {task.completed && <Check size={16} strokeWidth={4} />}
        </button>
        <span className="task-text">{task.title}</span>
        {task.important && <span className="important-label">Important</span>}
      </div>
      <div className="task-actions">
        <button onClick={handleImportance} className={`action-btn ${task.important ? 'important-active' : ''}`} title={task.important ? 'Remove important flag' : 'Mark as important'} aria-label={task.important ? 'Remove important flag' : 'Mark as important'}>
          <Star size={18} fill={task.important ? 'currentColor' : 'none'} />
        </button>
        <button onClick={handleDelete} className="action-btn" title="Delete task" aria-label="Delete task"><Trash2 size={18} /></button>
      </div>
    </div>
  );
};
export default TaskCard;
