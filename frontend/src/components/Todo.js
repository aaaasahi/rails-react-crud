import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Todo = props => {
  const initialState = {
    id: null,
    title: "",
    text: "",
  };
  const [currentTodo, setCurrentTodo] = useState(initialState);

  const getTodo = id => {
    axios.get(`http://localhost:3000/todos/${id}`)
      .then(response => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // params[:id]を受け取るためのもの idが変わったら実行
  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const onChangeInput = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateTodo = () => {
    axios.patch(`http://localhost:3000/todos/${currentTodo.id}`, currentTodo)
      .then(response => {
        console.log(response.data);
        props.history.push("/todos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    axios.delete(`http://localhost:3000/todos/${currentTodo.id}`)
      .then(response => {
        console.log(response.data);
        props.history.push("/todos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="edit-form">
        <h4>Todo</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentTodo.title}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              name="text"
              value={currentTodo.text}
              onChange={onChangeInput}
            />
          </div>
        </form>
        <button className="btn btn-danger mr-2" onClick={deleteTodo}>
          Delete
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={updateTodo}
        >
          Update
        </button>
      </div>
    </div>
  );
};


