import React from 'react';
import PropTypes from 'prop-types';
import './ressources/login.css';

export default function Login(props) {
  return (
    <>
      <LoginPage signup={props.login} />
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
      <div className="form">
        <div className="formContent">
          <h1>Login</h1>
          <form>
            <input type='text' name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="username"/>
            <br/>
            <input type='password' name='password'
              value={this.state.password}
              onChange={this.handleInputChange} 
              placeholder="password"/>
            <br/>
            <input type='submit' value='Login' onClick={this.handleLogin.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func
};
