import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [list, setList] = useState([]);
  const [editIndex,setEditIndex]=useState(-1)

  return (
    <TaskContext.Provider value={{ list, setList, editIndex,setEditIndex }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}