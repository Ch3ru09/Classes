import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <h1>Signup</h1>
        <form>
          <label>username</label>
          <input type='text' name='username'
            value={this.state.username}
            onChange={this.handleInputChange} />
          <label>email</label>
          <input type='text' name='email'
            value={this.state.email}
            onChange={this.handleInputChange} />
          <label>password</label>
          <input type='password' name='password'
            value={this.state.password}
            onChange={this.handleInputChange} />
          <input type='submit' value='Signup' onClick={this.handleSignup.bind(this)} />
        </form>
      </div>
    );
  }
}

SignupPage.propTypes= {
  signup: PropTypes.func
};