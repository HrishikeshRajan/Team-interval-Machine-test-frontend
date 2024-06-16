
import './App.css'
import { TaskContext } from './memory/context'
import Home from './pages/Home'
import { tasks } from '../src/seed/tasks.js';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState([])


  const update = (arr) => {
    setTask([...arr])
  }

  const deleteTask = (id) => {
    const taskz = task.filter((tas) => tas.id.toString() !== id.toString())
    setTask([...taskz])

  }

  const editTask = (id, data) => {
    const taskIndex = task.findIndex((tas) => tas.id.toString() === id.toString())
       if(taskIndex > -1) {
        task[taskIndex] = {...data}
       }
    setTask([...task])
  }



  

  return (
    <TaskContext.Provider value={{tasks: task, deleteTask, editTask, update}}>
          <Home />
      </TaskContext.Provider>

  )
}

export default App
