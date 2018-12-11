import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import { Link } from 'react-router-dom';

class Iterations extends Component {
  constructor(){
    global.header = new Headers();
    global.header.append("Authorization", "Basic " + myConfig.vstsToken);
      super()
          this.state = {
            iterationList: [],
            iterationWorkItems: [],
            workItemDetails: ''
          };
          this.getIterationData = this.getIterationData.bind(this);
          this.fetchWorkItemDetails = this.fetchWorkItemDetails.bind(this);
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
    fetchWorkItemDetails() {
        fetch("https://emisgroup.visualstudio.com/_apis/wit/workItems/150", {
            method: "GET",
            headers: global.header
        }).then(response => response.json())
          .then(workItemDetails => {
              this.setState({ workItemDetails: workItemDetails.fields })
        })
    }
    render() {
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
                    <Link to={'/WorkItem/'+ workitems.target.id} className="linkColor"><h4>{workitems.target.url}</h4></Link>
                    )}
            </div>
         </div>

      );
   }
}


export default Iterations;   
