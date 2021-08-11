import React from 'react';
import PropTypes from 'prop-types';
import './ressources/Lobby.css';

export default function Lobby() {
  return (
    <>
      <LobbyPage />
    </>
  );
}

class LobbyPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.setState({});
  }

  render() {
    return (
      <div className="lobbyPage">
        <header className="header">
          <div className="profile">profile</div>
          <div>
            <button 
              className="signup"
              onClick={this}
            >
            signup
            </button>
          </div>
          <div>
            <button 
              className="login"
              onClick={this}
            > 
            login
            </button>
          </div>
        </header>
        <div className="lobbyBody">
           
        </div>
      </div>
    );
  }
}
