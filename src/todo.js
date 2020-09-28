import React from 'react';

export default function Todo({ todo, toggle }) {

  function handleClicks() {
    toggle(todo.id)
  }

  return (
    <div>
    <label>
      <input type="checkbox" checked={todo.complete} onChange={handleClicks}/>
      {todo.name}
    </label>
    </div>
  )
}
