import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom'


export const AddTodo = () => {

    const initialState = {
      id: null,
      title: "",
      text: "",
    };

    const [todo, setTodo] = useState(initialState);
    const history = useHistory();

    const onChangeInput = event => {
      const { name, value } = event.target;
      setTodo({ ...todo, [name]: value });
    };

    const saveTodo = () => {
      var data = {
        title: todo.title,
        text: todo.text
      };

      axios.post('http://localhost:3000/todos', data)
        .then(resp => {
          setTodo({
            id: resp.data.id,
            title: resp.data.title,
            text: resp.data.text
          });
        console.log(resp.data);
        history.push('/todos');
      })
    .catch(e => {
      console.log(e)
    })
  };


  return (
    <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={todo.title}
              onChange={onChangeInput}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={todo.text}
              onChange={onChangeInput}
              name="text"
            />
          </div>

          <button onClick={saveTodo} className="btn btn-success">
            Submit
          </button>
        </div>
    </div>
  );
};