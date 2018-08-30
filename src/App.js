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
        planID: myConfig.planID,
        planData: []
      }
    }
  componentDidMount() {
      let header = new Headers();
      header.append("Authorization", "Basic " + myConfig.vstsToken);
      
      fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/_apis/work/plans/" + myConfig.planID, {
        method: "GET",
        headers: header
      }).then(response => response.json())
        .then( planData => this.setState({planData: planData.properties.markers}))
  }
  renderPlan() {
    console.log(this.state.planData);
    return this.state.planData.map(function(plan) {
      
      let crmPlans = plan.label.toLowerCase();
        if (crmPlans.indexOf("crm") > -1) {
          return <tr>
            <td>{crmPlans}</td>
            <td>{plan.date}</td>
            <td><a style={{backgroundColor: plan.color}}>{plan.color}{plan.color}</a></td>
          </tr>
        }
    });
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
            <div>
              <table>
                <tr>
                  <th>Release</th>
                  <th>Date</th> 
                  <th>color</th>
                </tr>
                {this.renderPlan()}
              </table>
            </div>
          </div>
      </div>
    </div>
    );
  }
}

export default App;
