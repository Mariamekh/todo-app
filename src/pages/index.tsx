import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodoList, addTodoList } from "../services/api";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
    staleTime: 0,  
  });

  const mutation = useMutation({
    mutationFn: addTodoList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSave = async (task) => {
    console.log("Saving task:", task);
    await mutation.mutateAsync(task);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Sidebar />
      <div className="flex-grow p-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-purple-500 text-white p-3 rounded-full fixed bottom-6 right-6 text-xl">+</button>
        {isLoading ? <p>Loading...</p> : <TaskList tasks={tasks} />}
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      </div>
    </Layout>
  );
}
