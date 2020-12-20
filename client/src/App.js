import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: [],
      complete: 0
    };
    this.updateInput = this.updateInput.bind(this);
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
          this.setState({
            tasks: [...this.state.tasks, ...newItem]
          });
          console.log(this.state.tasks);
        })
        .catch(error => {
          console.log(error);
        })

      //   // Continue fetch request here
    });
  }

  updateTask(e) {
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
          this.setstate({ tasks: [...this.state.tasks, ...updatedItem] });
          console.log(this.state.tasks);
        })
        .catch(error => {
          console.log(error);
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
        .then(res => {
          console.log(res.json);
          return res.json();
        })
        .then(data => {
          //refresh data
          console.log(data);
          //const list = [...this.state.input];
          //const updatedList = list.filter(item => item.id !==id)
          this.setState({ data: data });
        })

        .catch(error => {
          // upon failure, show error message
          //res.status(500).send(error);
          console.log("Error: Delete item unsuccesful");
        })
    });
  }

  // deleteItem(id){
  //   const list = [...this.state.list];

  //   const updatedList = list.filter(item => item.id !==id)
  //   this.setState({list: updatedList});
  // }

  render() {
    //const allTask = this.state.tasks
    return (
      <div className="App">
        <h1>Christmas To Do List</h1>
        Number of tasks are {this.state.tasks.length}
        <div>
          <label>
            My New Task:
            <input
              type="text"
              placeholder="type task here"
              value={this.state.input}
              onChange={e => this.updateInput(e)}
            />
          </label>
          <button onClick={e => this.addTask()}>Submit</button>
        </div>
        <div>
          {this.state.tasks.map(e => {
            return (
              <li key={e.text} id={e.id} complete={e.completed}>
                <span className={e.completed ? "crossed-line" : ""}>
                  {e.text}
                </span>
                <input
                  type="checkbox"
                  className="form-control"
                  checked={e.completed}
                  onChange={() => this.updateInput(e.text)}
                />
              </li>
            );
          })}
        </div>
        <button onClick={e => this.updateTask()}>Edit</button>
        <div></div>
      </div>
    );
  }
}
export default App;

// render() {
//   return (
//     <div className="App">
//       <h2>To Do List</h2>
//       <div>
//         <h3>Monday to Friday</h3>
//         <input
//           type="text"
//           placeholder="type task here..."
//           value={this.state.newItem}
//           onChange={(e =>this.updateInput("newItem", e.target.value))}
//         />
//         <button
//           onClick={() =>this.addTask()}
//           >
//         Add Task
//         </button>
//         <ul>
//          {this.state.list.map(item=>{
//             return(
//               <li key={item.id}>
//               {item.value}
//               <button
//                 onClick={()=>this.deleteItem(item.id)}
//               >
//               Delete
//               </button>
//             </li>
//             )
//          })}

//         </ul>
//     </div>
//   </div>
//   )
// };
