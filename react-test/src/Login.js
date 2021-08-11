import React from 'react';
import PropTypes from 'prop-types';

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label>username</label>
          <input type='text' name='username'
            value={this.state.username}
            onChange={this.handleInputChange} />
          <label>password</label>
          <input type='password' name='password'
            value={this.state.password}
            onChange={this.handleInputChange} />
          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
}