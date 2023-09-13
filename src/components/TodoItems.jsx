import React from 'react'

const TodoItems = ({title,description,isCompleted, deleteHandler, updateHandler,id}) => {
  return (
    <div className="todo">
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)}/>
            <button className="btn" onClick={()=>deleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItems