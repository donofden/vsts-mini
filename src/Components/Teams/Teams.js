import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import { Link } from 'react-router-dom';

class Teams extends Component {
    constructor(){
      global.header = new Headers();
      global.header.append("Authorization", "Basic " + myConfig.vstsToken);
        super()
          this.state = {
            teamsInPod: [],
            iterationList: [],
            loading: false,
            iterationWorkItems: [],
            workItemDetails: [],
            emptyData: false
          };
          this.getIterationList = this.getIterationList.bind(this);
          this.getWorkItems = this.getWorkItems.bind(this);
          this.getWorkItemFullDetails = this.getWorkItemFullDetails.bind(this);
    }
    
    componentDidMount() {
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
          fetch("https://" + myConfig.accountName + ".visualstudio.com/_apis/teams?api-version=4.1-preview.2", {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then( teamsInPod => this.setState({teamsInPod: teamsInPod.value}))
      }

    getIterationList(e) {
          this.setState({loading: true})

          fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + e.target.value + "/_apis/work/teamsettings/iterations", {
            method: "GET",
            headers: global.header
          })
          .then(response => response.json())
          .then( iterationList => {
            this.setState({iterationList: iterationList.value, loading: false});
          })
    }
    getWorkItems(e) {
      fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + myConfig.teamId + "/_apis/work/teamsettings/iterations/" + e.target.value + "/workitems", {
            method: "GET",
            headers: global.header
      }).then(response => response.json())
        .then( iterationWorkItems => {
            var workItemIds = [];

            if (typeof(iterationWorkItems.workItemRelations) === "undefined") {
              this.setState({emptyData: true});
            } else {
              this.setState({emptyData: false});
              for (var workItem of iterationWorkItems.workItemRelations) {
                workItemIds.push(workItem.target.id);
              }

              this.getWorkItemFullDetails(workItemIds.join(','));
            }
        })
    }
    getWorkItemFullDetails(workItemIds) {
      fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/_apis/wit/workitems?ids=" + workItemIds, {
            method: "GET",
            headers: global.header
      }).then(response => response.json())
        .then(workItemDetails => this.setState({workItemDetails: workItemDetails.value}))
    }
    render() {
      let iterationListHtml;
      let workItemDetails;

      if (this.state.loading) {
        iterationListHtml = <div>Loading...</div>;
      } else {
        iterationListHtml = <select id="teamsList" onChange={this.getWorkItems}>
          <option key="">Choose iteration</option>
          {this.state.iterationList.map(iteration =>
            <option key={iteration.id} value={iteration.id}>{iteration.name}</option>
          )}
        </select>
      }
      if(this.state.emptyData) {
        workItemDetails = "Oops!! No data found";
      } else {
        workItemDetails = <div> {this.state.workItemDetails.map(workItemInfo =>
          <div key={workItemInfo.id}><Link to={'/WorkItem/'+ workItemInfo.id} className="whiteText">{workItemInfo.fields['System.Title']}</Link></div>
        )}</div>
      }
      return (
          <div>
            <div className="custom-select">
              <select id="teamsList" onChange={this.getIterationList}>
                    <option key="">Choose team</option>
                    {this.state.teamsInPod.map(team =>
                      <option key={team.id} value={team.id}>{team.name}</option>
                    )}
              </select>
            </div>
            <div>
                  {iterationListHtml}
            </div>
                  {workItemDetails}
          </div>
      );
    }
}
export default Teams;
