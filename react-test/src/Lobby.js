import React from 'react';
import propTypes from 'prop-types';
import './ressources/Lobby.css';

export default function Lobby(user) {
  return (
    <>
      <LobbyPage user />
    </>
  );
}

LobbyPage.propTypes = {
  user: propTypes.array
}

class LobbyPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.setState({
      user: this.props.user
    });
    
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
