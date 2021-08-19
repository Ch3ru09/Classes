import React from 'react';
import PropTypes from 'prop-types';
import './ressources/todo-list.css';

export default class TodoList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getTodos()
      .then(tasks => {
        this.setState({tasks});
      });
  }

  render() {
    return (
      <div className="todoBody">
        <div className="todoContent" />
        <TodoForm addTodo={this.handleAddTodo.bind(this)} />
        <TodoTable
          tasks={this.state.tasks} 
          removeTodo={this.handleRemoveTodo.bind(this)} 
          updateTodo={this.handleUpdateTodo.bind(this)} 
        />
      </div>
    );
  }

  getTodos() {
    var requestOptions = {
      method: 'GET',
      //headers: {
      //  'x-user-token': this.props.user.token
      //}
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
      .then(response => {
        return response.json();
      });
  }


  handleAddTodo({taskName, taskDescription}) {

    this.addTodo({taskName, taskDescription})
      .then(todo => {
        const tasks = this.state.tasks;
        tasks.push(todo);
        this.setState({tasks});
      });
  }

  handleRemoveTodo(id) {
    this.removeTodo(id)
      .then(id => {
        const tasks = this.state.tasks;
        const index = tasks.findIndex(task => task.id == id);
        tasks.splice(index, 1);
        this.setState({tasks});
      });
  }

  removeTodo(id) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json'); 

    var raw = JSON.stringify({
      userId: 1
    }); 

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch('http://localhost:3000/api/todos/' + id, requestOptions)
      .then(response => response.json());
  }
}

TodoList.propTypes = {
  user: PropTypes.object,
};

class TodoTable extends React.Component {

  render() {
    return (
      <div id='allTasks'>
        <table className='theTable' border="1">
          <thead>
            <tr>
              <td>Is Done</td>
              <td>Name</td>
              <td>Description</td>
              <td>Options</td>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map(task => {
              return (
                <tr key={task.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={task.status == 'finished'}
                      onChange={(event) => this.props.updateTodo(task.id, event.target)} 
                      className="checkbox" />
                  </td>
                  <td>{task.task_name}</td>
                  <td>{task.task_description}</td>
                  <td><button onClick={() => this.props.removeTodo(task.id)} className="removeTask">X</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

}

TodoTable.propTypes = {
  updateTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  tasks: PropTypes.array,
};

class TodoForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      taskName: '',
      taskDescription: '',
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
    this.props.addTodo({
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
    });
  }

  render() {
    return (
      <form className="addTaskForm">
        <h1 className="title"> Todos </h1>
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
        <input 
          type='submit' 
          value='Submit' 
          onClick={this.handleSubmit} 
          className="submitButton" />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func,
};