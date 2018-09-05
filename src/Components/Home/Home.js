import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class Home extends Component {
    constructor(){
        super()
          this.state = {
            planData: [],
            iterationWorkItems: [],
          };
        this.getIterationData = this.getIterationData.bind(this);
        
        }
    componentDidMount() {
     
      
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
        this.setState({ workItemRelations: "" });
        fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/" + myConfig.teamId + "/_apis/work/teamsettings/iterations?api-version=4.1", {
          method: "GET",
          headers: header
        }).then(response => response.json())
          .then( planData => this.setState({planData: planData.value}))
    }
    getIterationData(event) {
          let header = new Headers();
          header.append("Authorization", "Basic " + myConfig.vstsToken);
          
          fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + myConfig.teamId + "/_apis/work/teamsettings/iterations/" + event.target.value + "/workitems", {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then( iterationWorkItems => this.setState({iterationWorkItems: iterationWorkItems.workItemRelations}))
    }
    render() {
      return (
         <div>
            <h2>Home</h2>
         </div>

      );
   }
}

export default Home;   
