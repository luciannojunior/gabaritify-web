import React, { Component } from 'react';
import Base from './components/Base';

import './App.css';

class App extends Component {
  componentDidMount() {
    document.title = 'Gabaritify - Reconhecimento de Gabaritos';
  }
  
  render() {
    return (
      <div>
        <Base/>
      </div>
    );
  }
}

export default App;