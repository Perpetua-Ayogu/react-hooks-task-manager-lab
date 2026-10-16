
import React, {
  createContext,
  useState,
  useEffect
} from "react";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // GET: Load all tasks from the backend
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // POST: Add a new task
  function addTask(title) {
    const newTask = {
      title: title,
      completed: false
    };

    return fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        return response.json();
      })
      .then((savedTask) => {
        setTasks((previousTasks) => [
          ...previousTasks,
          savedTask
        ]);

        return savedTask;
      });
  }

  // PATCH: Mark a task as complete or incomplete
  function toggleComplete(task) {
    return fetch(
      `http://localhost:6001/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        return response.json();
      })
      .then((updatedTask) => {
        setTasks((previousTasks) =>
          previousTasks.map((currentTask) =>
            currentTask.id === updatedTask.id
              ? updatedTask
              : currentTask
          )
        );

        return updatedTask;
      });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleComplete
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
