import React from 'react';
import TodoList from './TodoList';
import Lobby from './Lobby';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    // get token from localStorage
    // const user = {token: localStorage.getItem('xxx')}
    // this.setState({user})
  }

  handleLogin({username, password}) {
    // request to server
    // .then(user => this.setState({user}))
    // set token to localStorage
  }

  render() {
    if (this.state.user) {
      return (
        <TodoList user={this.state.user} />
      );
    }
    return (
      <Lobby />
    );
  }
}

export default App;
