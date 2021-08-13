import React from 'react';
import propTypes from 'prop-types';

import Login from './login';
import Signup from './signup';
import TodoList from './todo-list';

import './ressources/lobby.css';

export default class Lobby extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <LobbyPage />
      </>
    );
  }
  
}

class LobbyPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login',
      user: null,
    };
  }

  forwardPage(page) {
    this.setState({currentPage: page});
  }

  signup({email, username, password}) {
    this.doSignup({email, username, password})
      .then(user => {
        this.setState({
          user,
        });
      });
  }

  doSignup({email, username, password}) {
    var requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };
    
    return fetch('http://localhost:3000/api/signup', requestOptions)
      .then(response => response.json());
  }

  login({username, password}) {
    this.doLogin({username, password})
      .then(user => {
        this.setState({user});
      });
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
      .then(response => response.json());
  }

  render() {
    return (
      <div className="lobbyPage">
        <header className="header">
          {this.state.user
            ? <div className="profile">profile</div>
            : <div>
              <div>
                <button 
                  className="signup"
                  onClick={() => this.forwardPage('signup')}
                >
                signup
                </button>
              </div>
              <div>
                <button 
                  className="login"
                  onClick={() => this.forwardPage('login')}
                > 
                login
                </button>
              </div>
            </div>
          }
        </header>
        <div className="lobbyBody">
          {this.state.user
            ? <TodoList user={this.state.user} />
            : this.state.currentPage == 'login'
              ? <Login login={this.login.bind(this)} />
              : <Signup signup={this.signup.bind(this)} />
          }
        </div>
      </div>
    );
  }
}
