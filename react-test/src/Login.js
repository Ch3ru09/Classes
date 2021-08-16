import React from 'react';
import { PropTypes } from 'prop-types';
import './ressources/login-signup.css';

export default function Login(props) {
  return (
    <>
      <LoginPage login={props.login} />
    </>
  );
}
Login.propTypes = {
  login: PropTypes.func
};

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

  handleLogin(event) {
    event.preventDefault();
    this.props.login(this.state);
  }
  
  render() {
    return (
      <div id="form">
        <div className="formContent">
          <h1>Login</h1>
          <form>
            <input 
              type='text' 
              name='username'
              className="formInput"
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="username"/>
            <input 
              type='password' 
              name='password'
              className="formInput"
              value={this.state.password}
              onChange={this.handleInputChange} 
              placeholder="password"/>
            <input 
              type='submit' 
              value='Login' 
              className="submit"
              onClick={this.handleLogin.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  login: PropTypes.func
};
