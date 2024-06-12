import React, { useState, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Home() {
  const [todo, setTodo] = useState("");
  const { user } = useSelector((state) => state.currentUser); // Adjust as needed to fetch the current user
  const { data } = useCollection(
    "tasks",
    user?.uid ? ["uid", "==", user.uid] : null
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      toast.error("Todo cannot be empty");
      return;
    }

    const newTask = {
      title: todo,
      id: user.id,
    };

    try {
      await addDoc(collection(db, "tasks"), newTask);
      toast.success("Task added successfully");
      setTodo("");
    } catch (error) {
      toast.error("Error adding task: ", error);
      toast.error("Failed to add task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-bold text-center mb-10">Todo List</h1>
        <div className="flex justify-center items-center">
          <input
            placeholder="Add new todo..."
            className="input input-bordered w-full max-w-xl"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
          />
          <button className="btn btn-primary ml-2 py-3 w-20" type="submit">
            Add
          </button>
        </div>
      </form>
      <div>
        <ul>
          {Array.isArray(data) &&
            data.map((task) => (
              <div
                className="mx-auto text-center mt-7 rounded-lg p-3 w-[600px] bg-slate-100"
                key={task.id}>
                <li className="bordered font-semibold flex justify-between pl-5">
                  <span>{task.title}</span>{" "}
                  <span
                    onClick={() => handleDelete(task.id)}
                    className="cursor-pointer hover:bg-red-200 rounded">
                    ❌
                  </span>{" "}
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
