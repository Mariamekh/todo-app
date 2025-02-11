import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsDone, removeTodoListItem, editTodoList } from "../services/api";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const TaskList = ({ tasks }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const editMutation = useMutation({
    mutationFn: async (task) => {
      if (!task.id) throw new Error("Task ID is missing!");
      return editTodoList(task.id, task.title, task.description);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleEdit = (task) => {
    console.log("Editing task:", task);  
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSave = async (task) => {
    console.log("Saving task:", task);  
    if (task.id) {
      await editMutation.mutateAsync(task);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={() => removeTodoListItem(task.id)}
            onMarkCompleted={() => markAsDone(task.id)}
          />
        ))}
      </div>

       <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={taskToEdit} 
      />
    </>
  );
};

export default TaskList;
