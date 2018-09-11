import React, { Component } from 'react';
import './App.css';
import Menu from "./Menu/Menu.js";
import Main from "./Components/Main";


class App extends Component {
  render() {
    return (
      <div>
         <Menu />
         <Main />
    </div>
    );
  }
}

export default App;
