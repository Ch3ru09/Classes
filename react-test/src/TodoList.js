import React from 'react';
// import './TodoList.css'

export default function TodoList() {
  return (
    <div>
      <TodoForm />
      {/* <TodoTable /> */}
    </div>
  );
}

// class TodoTable extends React.Component {

// }

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

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    var raw = JSON.stringify({
      'taskName': this.state.TodoTable,
      'taskDescription': this.state.taskDescription,
      'userId': 1
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch('http://localhost:3000/api/todos', requestOptions)
      .then(response => response.json())
      .then(result => {
        const tasks = this.state.tasks;
        tasks.push(result);
        this.setState({tasks});
      })
      .catch(error => console.log('error', error));
  }

  getTodos() {
    var raw = JSON.stringify({
      'userId': 1
    });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }; 

    fetch('http://localhost:3000/api/todos', requestOptions)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <>
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
        <div id='allTasks'>
          {this.getTodos()
            .then(todos => {
              todos.forEach(todo => {
                document.getElementById.innerHtml())
              });
            })}
        </div>
      </>
    );
  }
}
