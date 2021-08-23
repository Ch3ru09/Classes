import React from 'react';
import { PropTypes } from 'prop-types';
import { useAlert } from 'react-alert';
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
      errMessage: null,
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
    if (this.state.username.trim() != '' && this.state.password.trim() != '') {
      this.doLogin(this.state)
        .then(user => {
          this.props.login(user);
        })
        .catch(err => {
          this.setState({errMessage: err.message});
        });
    } else {
      this.setState({errMessage: 'Username or password is required.'});
    }
    
  }

  doLogin({username, password}) {
    var requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    
    return fetch('http://localhost:3000/api/login', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(errBody => {
          throw new Error(errBody.errMessage);
        });
      });
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
              placeholder="username"
              required />
            <input 
              type='password' 
              name='password'
              className="formInput"
              value={this.state.password}
              onChange={this.handleInputChange} 
              placeholder="password"
              required />
            {
              this.state.errMessage &&
                <div id="wrongAccount" className="wrongAccount">{this.state.errMessage}</div>
            }
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
