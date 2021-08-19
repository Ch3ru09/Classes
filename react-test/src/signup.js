import React from 'react';
import PropTypes from 'prop-types';
import './ressources/login-signup.css';

export default function Signup(props) {
  return (
    <>
      <SignupPage signup={props.signup} />
    </>
  );
}
Signup.propTypes = {
  signup: PropTypes.func,
};

class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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

  handleSignup(event) {
    event.preventDefault();
    this.props.signup(this.state);
  }
  
  render() {
    return (
      <div id="form">
        <div className="formContent">
          <h1>Signup</h1>
          <form className="submitForm">
            <input 
              type='text' 
              name='username'
              placeholder='username'
              className="formInput"
              value={this.state.username}
              onChange={this.handleInputChange} />
            <input 
              type='text'
              name='email'
              placeholder='email'
              className="formInput"
              value={this.state.email}
              onChange={this.handleInputChange} />
            <input 
              type='password'
              name='password'
              className="formInput"
              placeholder='password'
              value ={this.state.password}
              onChange={this.handleInputChange} />
            <input 
              type='submit' 
              value='Signup' 
              className="submit"
              onClick={this.handleSignup.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes= {
  signup: PropTypes.func
};