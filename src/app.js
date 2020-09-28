import React, { useState, useRef, useEffect } from 'react';
import TodoList from './todolist';
import { v4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todolist.todos';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedTodos) setTodos(JSON.parse(storedTodos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => { return [...prevTodos, { id: v4(), name, complete: false}]} )
    todoNameRef.current.value = null
  }

  function clearComplete(e) {
    setTodos(todos.filter(todo => !todo.complete))
  }

  return (
    <>
      <TodoList todos={todos} toggle={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearComplete}>Clear Complete</button>.
      <div>{todos.filter(todo => !todo.complete).length} to go</div>
    </>
  )
}

export default App;
