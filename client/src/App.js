import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: []
    };
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  componentDidMount() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        this.updateTask(json);
      })
      .catch(error => {
        // upon failure, show error message
        // res.status(500).send(error);
        console.log("Error: please try again");
      });
  }

  addTask() {
    fetch("/api/todos", {
      method: "POST", // POST because you're adding
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.input,
        complete: this.state.complete
      })
        .then(res => {
          console.log(res.json);
          return res.json();
        })
        .then(data => {
          console.log("data with id", data);
          const newItem = [
            {
              id: data.insertId,
              text: this.state.input,
              complete: this.state.complete
            }
          ];
          this.set
            .state({
              tasks: [...this.state.tasks, ...newItem]
            })
            .catch(error => {
              console.log(error);
            });
        })

      //   // Continue fetch request here
    });
  }

  updateTask() {
    // update this.state.task.push(what i get frm json)
    // upon success, update tasks
    // upon failure, show error message
    //let finishedTask = this.state.todos.find(todo.id === id);
    //finishedTask.completed =  finishedTask.completed ? 0:1;
    fetch("/api/todos/todo_ID", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.input,
        complete: this.state.complete
      })

        .then(res => {
          console.log(res.json);
          return res.json();
        })
        .then(data => {
          //console.log("data with id", data);
          const updatedItem = [
            {
              id: this.state.id,
              text: this.state.input,
              complete: this.state.complete
            }
          ];
          this.set
            .state({
              tasks: [...this.state.tasks, ...updatedItem]
            })
            .catch(error => {
              console.log(error);
            });
        })
    });
  }

  deleteTask(todo_id) {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
    fetch("/api/todos/todo_ID", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.input,
        complete: this.state.complete
      })
        .then(res => res.json())
        //this.setState({tasks: i})
        .catch(error => {
          // upon failure, show error message
          //res.status(500).send(error);
          console.log("Error: Delete item unsuccesful");
        })
    });
  }

  render() {
    //const allTask = this.state.tasks
    return (
      <div>
        <h1>Christmas To Do List</h1>

        <div>
          <label>
            My New Task:
            <input
              type="text"
              placeholder="type task here"
              value={this.state.tasks}
              onChange={e => this.updateInput(e)}
            />
          </label>
          <button onClick={e => this.addTask()}>Submit</button>
        </div>
        <div>
          {this.state.tasks.map(e => {
            return (
              <li key={e.text}>
                {e.value}
                <button onClick={() => this.deleteItem(this.state.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </div>
        <button
          onClick={this.updateTask.bind(
            this,
            this.state.id,
            this.state.text,
            this.state.complete
          )}
        >
          Edit
        </button>
        <div>
          {/* <button>
            Delete
            {this.deleteTask.bind(this, this.state.id)}
          </button>
          Delete */}
        </div>
      </div>
    );
  }
}
export default App;

// ul>
//            {this.state.list.map(item=>{
//               return(
//                 <li key={item.id}>
//                 {item.value}
//                 <button
//                   onClick={()=>this.deleteItem(item.id)}
//                 >
//                 Delete
//                 </button>
//               </li>
//               )
//            })}
