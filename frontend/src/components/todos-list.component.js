import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// child component as a functional component TODO for the todolist
const Todo = props => {
  return (
    <React.Fragment>
      <tr>
        <td className={props.todo.todo_completed ? "completed" : ""}>
          {props.todo.todo_description}
        </td>
        <td className={props.todo.todo_completed ? "completed" : ""}>
          {props.todo.todo_responsible}
        </td>
        <td className={props.todo.todo_completed ? "completed" : ""}>
          {props.todo.todo_priority}
        </td>
        <td>
          <Link to={"/edit/" + props.todo._id}>edit</Link>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  todoList() {
    return this.state.todos.map((item, index) => {
      return <Todo todo={item} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
