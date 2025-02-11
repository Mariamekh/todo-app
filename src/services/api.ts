const API_URL = "http://localhost:3000/api/todos";  

export const getTodoList = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  };
  
  export const addTodoList = async (newTask: { title: string; description: string }) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
  
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  };
  
  export const removeTodoListItem = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete task: ${errorText}`);
    }
  
    return res.json(); 
  };
  
  export const editTodoList = async (id, title, description) => {
    if (!id) throw new Error("Edit failed: Task ID is missing!"); // Debugging ✅
    
    console.log("Editing task:", { id, title, description });
  
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
  
    if (!res.ok) throw new Error("Failed to edit task");
    return res.json();
  };
  
  
  
  export const clearTodoList = async () => {
    const res = await fetch(API_URL, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to clear tasks");
  };
  
  export const markAsDone = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: 1 }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to mark as done: ${errorText}`);
    }
  
    return res.json(); 
  };
  
  
  