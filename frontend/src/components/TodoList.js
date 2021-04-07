import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    retrieveTodos();
  }, []);

  const retrieveTodos = () => {
    axios.get('http://localhost:3000/todos')
      .then(response => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
      </div>
      <div className="col-md-10">
        <h4>Todo List</h4>

        <ul className="list-group">
          {todos.map((todo, index) => (
              <Link to={`/todos/${todo.id}`}>
                <li
                  className={
                    "list-group-item "
                  }
                  key={index}
                >
                  {todo.title}
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

