import React from 'react';
import PropTypes from 'prop-types';
import './ressources/todo-list.css';
import trashImage from './ressources/115789.png';

export default class TodoList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      tasks: [],
      addImage: {},
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
          logout={this.props.logout.bind(this)}
          removeTodo={this.handleRemoveTodo.bind(this)} 
          updateTodo={this.handleUpdateTodo.bind(this)}
          handleAddImage={this.handleAddImage.bind(this)}
        />
      </div>
    );
  }

  getTodos() {
    var requestOptions = {
      method: 'GET',
      headers: {
        'x-user-token': this.props.user.token
      }
    }; 

    return fetch('http://localhost:3000/api/todos', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(() => {
          this.props.logout();
        });
      });
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
    var raw = JSON.stringify({
      status,
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-token': this.props.user.token
      },
      body: raw,
    };
    
    return fetch('http://localhost:3000/api/todos/' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(() => {
          this.props.logout();
        });
      });
  }

  addTodo({taskName, taskDescription}) {
  
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-token': this.props.user.token
      },
      body: JSON.stringify({
        taskName,
        taskDescription,
      }),
    };
    
    return fetch('http://localhost:3000/api/todos', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(() => {
          this.props.logout();
        });
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
    var requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-user-token': this.props.user.token
      },
    };
    
    return fetch('http://localhost:3000/api/todos/' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(() => {
          this.props.logout();
        });
      });
  }

  handleAddImage(event, id) {
    event.preventDefault();

    const image = event.target.files[0];
    const data = new FormData();
    data.set('photo', image);
    data.append('name', 'Test Name');
    data.append('desc', 'Test description');

    console.log('*> ', data);
    
    this.doAddImage(data, id)
      .then(todo => {
        const tasks = this.state.tasks;
        const index = tasks.findIndex(t => t.id == todo.id);
        tasks.splice(index, 1, todo);
        this.setState({tasks});
      });
  }

  doAddImage(data, id) {

    var requestOptions = {
      method: 'POST',
      headers: {
        'x-user-token': this.props.user.token,
      },
      body: data,
    };
    
    return fetch('http://localhost:3000/api/todos/image/' + id, requestOptions)
      .then(response => {
        if (response.ok) {
          console.log(response.json());
          return response.json();
        }
        return response.json().then(() => {
          this.props.logout();
        });
      }); 
  }

  
}

TodoList.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
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
                  <td>
                    <input 
                      type="file" 
                      className="addImage" 
                      onChange={event => this.props.handleAddImage(event, task.id)} 
                      display={'image' in task ? 'none' : 'block'} />
                    <button onClick={() => this.props.removeTodo(task.id)} className="removeTask">
                      <img src={trashImage} alt="" height="15px" width="15px" />
                    </button>
                  </td>
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
  tasks: PropTypes.array,
  logout: PropTypes.func,
  updateTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  handleAddImage: PropTypes.func,
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