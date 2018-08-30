import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="bgimg">
          <div className="topleft">
              <p>VSTS Delivery Timeline View</p>
          </div>
          <div className="middle">
            <h1>Development Tooling and Engineering POD</h1>
            <hr></hr>
            <h3>Next Release</h3>

            <h2 id="team" className="h2-style"></h2>
            <p id="release" className="p-release-style"></p>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
