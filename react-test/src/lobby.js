import React from 'react';
// import propTypes from 'prop-types';
import localStorage from 'local-storage';

import Login from './login';
import Signup from './signup';
import TodoList from './todo-list';

import './ressources/lobby.css';

export default class Lobby extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <LobbyPage />
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

  componentDidMount() {
    this.setState({user: localStorage.get('user-info')});
  }

  forwardPage(page) {
    this.setState({currentPage: page});
  }

  signup({email, username, password}) {
    this.doSignup({email, username, password})
      .then(user => {
        localStorage.set('user-info', user);
        this.setState({user});
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

  login(user) {
    localStorage.set('user-info', user);
    this.setState({user});
  }

  toggleDropdown() {
    document.getElementById('profileDropdown').classList.toggle('show');
  }

  logout() {
    localStorage.remove('user-info');
    this.setState({
      user: null,
      currentPage: 'login',
    });
  }

  render() {
    return (
      <div className="lobbyPage">
        <header className="header">
          {this.state.user
            ? <div className="profileHeader">
              <button className="profileBtn" onClick={() => this.toggleDropdown()}>{this.state.user.username}</button>
              <div id="profileDropdown" className="profile">
                <a onClick={() => {}}>Manage</a>
                <a onClick={() => {}}>IDK yet</a>
                <a onClick={() => this.logout()}>Logout</a>
              </div>
            </div>
            
            : <div className="headerBtn">
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
            ? <TodoList user={this.state.user} logout={this.logout.bind(this)} />
            : this.state.currentPage === 'login'
              ? <Login login={this.login.bind(this)} />
              : <Signup signup={this.signup.bind(this)} />
          }
        </div>
      </div>
    );
  }
}
