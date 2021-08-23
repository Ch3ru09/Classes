import React from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Lobby from './lobby';



class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Lobby />
      </AlertProvider>
      
    );
  }
}

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

export default App;
