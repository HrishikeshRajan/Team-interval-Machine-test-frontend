
import './App.css'
import { TaskContext } from './memory/context'
import Home from './pages/Home'
import { tasks } from '../src/seed/tasks.js';
import { useState } from 'react';

function App() {

  const [task] = useState(tasks)

  

  return (
    <TaskContext.Provider value={{tasks: task}}>
          <Home />
      </TaskContext.Provider>

  )
}

export default App
