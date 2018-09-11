import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class Iterations extends Component {
  constructor(){
    global.header = new Headers();
    global.header.append("Authorization", "Basic " + myConfig.vstsToken);
      super()
          this.state = {
            iterationList: [],
            iterationWorkItems: [],
          };
          this.getIterationData = this.getIterationData.bind(this);
      }
    componentDidMount() {
        this.setState({ workItemRelations: "" });
        fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/" + myConfig.teamId + "/_apis/work/teamsettings/iterations?api-version=4.1", {
          method: "GET",
          headers:  global.header
        }).then(response => response.json())
          .then( iterationList => this.setState({iterationList: iterationList.value}))

    }
    getIterationData(event) {
          fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + myConfig.teamId + "/_apis/work/teamsettings/iterations/" + event.target.value + "/workitems", {
            method: "GET",
            headers: global.header
          }).then(response => response.json())
            .then( iterationWorkItems => this.setState({iterationWorkItems: iterationWorkItems.workItemRelations}))
    }
    render() {
      let workItemURL = 'https://emisgroup.visualstudio.com/emishealth/_workitems/edit/'
      return (
         <div>
            <div> 
              <select id="iterationList" onChange={this.getIterationData}>
                    <option key="">Choose iteration</option>
                    {this.state.iterationList.map(iteration => 
                      <option key={iteration.id} value={iteration.id}>{iteration.name}</option>
                    )}
              </select>
            </div>
            
            <div>
              {this.state.iterationWorkItems.map(workitems => workitems=== null ? 'No items found' :
                     <p key={workitems.target.id}>{workitems.target.id} - <a href={workItemURL + workitems.target.id}target="_blank">{workitems.target.url}</a></p>
                    )}
            </div>
         </div>

      );
   }
}


export default Iterations;   
