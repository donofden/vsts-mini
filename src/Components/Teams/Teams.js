import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class Teams extends Component {
    constructor(){
        super()
          this.state = {
            teamsinPod: []
          };
    }
    
    componentDidMount() {
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
        fetch("https://" + myConfig.accountName + ".visualstudio.com/_apis/teams?api-version=4.1-preview.2", {
          method: "GET",
          headers: header
        }).then(response => response.json())
          .then( teamsinPod => this.setState({teamsinPod: teamsinPod.value}))
      }
    render() {
      return (
          <div>
            <div>
              <select id="teamsList">
                    <option key="">Choose team</option>
                    {this.state.teamsinPod.map(iteration =>
                      <option key={iteration.id} value={iteration.id}>{iteration.name}</option>
                    )}
              </select>
            </div>
          </div>
      );
    }
}
export default Teams;
