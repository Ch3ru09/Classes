import React from 'react'
// import './TodoList.css'

export default function TodoList() {
  return (
    <div>
      <TodoForm />
    </div>
  )
}

class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {nameValue: "", descValue: ""}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
 
  handleInputChange(event) {
    const target = event.target;
    const value = event.name === "todoName" ? target.value : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  getTodos(username) {
    // get todos with express or node 
  }

  render() {
    return (
      <form>
        <h1> Todos </h1>
        <input 
          name="todoName"
          type="textarea"
          value={this.state.nameValue} 
          onChange={this.handleInputChange} 
        />
        <input 
          name="todoDesc"
          type="textarea"
          value={this.state.discValue} 
          onChange={this.handleChange} 
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
