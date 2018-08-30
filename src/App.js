import React, { Component } from 'react';
import './App.css';
import { myConfig } from './config.js';

class App extends Component {
  constructor(){
    super()
      this.state = {
        vstsToken: myConfig.vstsToken,
        accountName: myConfig.accountName,
        project: myConfig.project,
        planID: myConfig.planID
      }
    }
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

            <h2 id="team" className="h2-style">{this.state.accountName}</h2>
            <p id="release" className="p-release-style"></p>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
