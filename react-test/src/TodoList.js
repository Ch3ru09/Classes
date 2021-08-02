import React from 'react'

export default function TodoList() {
  return (
    <div>
      
    </div>
  )
}

class todoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: ""}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  getTodos(username) {
    // get todos with express or node 
  }

  render() {
    <form>
      <h1> Todos </h1>
      <textarea value="{this.state.value}" onChange={this.handleChange} />
      <textarea value="{this.state.value}" onChange={this.handleChange} />
      <input type="submit" value="Submit" />
    </form>
  }
}