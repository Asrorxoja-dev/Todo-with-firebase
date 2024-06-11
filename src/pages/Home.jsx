import React, { useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useSelector } from 'react-redux';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig';
import toast from 'react-hot-toast';

function Home() {
  const [todo, setTodo] = useState('');
  const { user } = useSelector((state) => state.currentUser); // Adjust as needed to fetch the current user
  const { data } = useCollection("tasks", "==", user?.uid);
 const [title, setTitle] = useState('')
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) {
      alert("Todo cannot be empty");
      return;
    }

   

    const newTask = {
      title: todo,
      id: new Date()
    };

    try {
      await addDoc(collection(db, "tasks"), newTask);
      toast.success("Task added successfully");
      setTodo(''); 
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold text-center mb-10'>Todo List</h1>
        <div className='flex justify-center items-center'>
          <input
            placeholder='Add new todo...'
            className='input input-bordered w-full max-w-xs'
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
          />
          <button className='btn btn-primary' type="submit">Add</button>
        </div>
      </form>
      <div>
      <ul>
        {Array.isArray(data) && data.map(task => (
          <div key={task.id}>
            <li>{task.title}</li>
          </div>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Home;
