import React from 'react';
import PropTypes from 'prop-types';
// import './TodoList.css'

export default class TodoList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getTodos()
      .then(tasks=> {
        this.setState({tasks});
      });
  }

  render() {
    return (
      <div>
        <TodoForm />
        <TodoTable tasks={this.state.tasks} updateTodo={this.handleUpdateTodo.bind(this)} />
      </div>
    );
  }

  getTodos() {
    var requestOptions = {
      method: 'GET',
    }; 

    return fetch('http://localhost:3000/api/todos?userId=1', requestOptions)
      .then(response => response.json());
  }

  handleUpdateTodo(id, target) {
    const status = target.checked ? 'finished' : 'unfinished';
    this.updateTodo(id, {status})
      .then(todo => {
        const tasks = this.state.tasks;
        const index = tasks.findIndex(t => t.id == todo.id);
        tasks.splice(index, 1, todo);
        this.setState({tasks});
      });
  }

  updateTodo(id, {status}) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    var raw = JSON.stringify({
      status,
      userId: 1
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch('http://localhost:3000/api/todos/' + id, requestOptions)
      .then(response => response.json());
  }

}

class TodoTable extends React.Component {

  render() {
    return (
      <div id='allTasks'>
        <table>
          <thead>
            <tr>
              <td>Is Done</td>
              <td>Name</td>
              <td>Description</td>
              <td>Options</td>
            </tr>
          </thead>
          {this.props.tasks.map(task => {
            return (
              <tr key={task.id}>
                <td><input type="checkbox"
                           checked={task.status == 'finished'}
                           onChange={(event) => this.props.updateTodo(task.id, event.target)}>
                    </input></td>
                <td>{task.taskName}</td>
                <td>{task.taskDescription}</td>
                <td><button>X</button></td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }

}

TodoTable.propTypes = {
  tasks: PropTypes.array,
  updateTodo: PropTypes.func,
};

class TodoForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      taskName: '',
      taskDescription: '',
      tasks: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

 
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addTodo({
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
    })
      .then(todo => {
        const tasks = this.state.tasks;
        tasks.push(todo);
        this.setState({tasks});
      });
  }

  addTodo({taskName, taskDescription}) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    var raw = JSON.stringify({
      taskName,
      taskDescription,
      userId: 1
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch('http://localhost:3000/api/todos', requestOptions)
      .then(response => response.json());
  }

  render() {
    return (
      <form>
        <h1> Todos </h1>
        <input 
          name='taskName'
          type='textarea'
          value={this.state.taskName} 
          onChange={this.handleInputChange} 
        />
        <input 
          name='taskDescription'
          type='textarea'
          value={this.state.taskDescription} 
          onChange={this.handleInputChange} 
        />
        <input type='submit' value='Submit' onClick={this.handleSubmit} />
      </form>
    );
  }
}
