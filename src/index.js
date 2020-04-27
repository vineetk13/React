import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Heading() {
  return <h1>React TODO App</h1>;
}
function Form({ onAction }) {
  return (
    <div className="form">
      <input type="text" className="input" placeholder="Add a todo..." />
      <br />
      <br />
      <button className="submit-btn" onClick={onAction}>
        Save
      </button>
    </div>
  );
}
function AddTodo(props) {
  return (
    <li key={props.todo.id}>
      <input
        type="checkbox"
        className="item"
        checked={props.todo.checked}
        onChange={props.onToggle}
      />
      <span className="item">{props.todo.text}</span>
      <button className="delete-btn" onClick={props.onDelete}>
        Delete
      </button>
    </li>
  );
}

let id = 0;
class Todo extends React.Component {
  state = {
    todos: []
  };
  addTodo = e => {
    var text = document.querySelector(".input").value;
    if (text !== "") {
      this.setState({
        todos: [...this.state.todos, { id: id++, text: text, checked: false }]
      });
    }
    console.log(text);
  };

  toggleTodo = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  };

  removeTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };
  render() {
    return (
      <div className="container">
        <Form onAction={this.addTodo} />
        <div className="counters">
          <div>Total: {this.state.todos.length}</div>
          <div>
            Unchecked:
            {this.state.todos.filter(todo => todo.checked === false).length}
          </div>
        </div>
        <div className="list">
          <ul className="l">
            {this.state.todos.map(t => (
              <AddTodo
                onToggle={() => this.toggleTodo(t.id)}
                onDelete={() => this.removeTodo(t.id)}
                todo={t}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <Heading />
    <Todo />
  </div>,
  document.querySelector("#root")
);
