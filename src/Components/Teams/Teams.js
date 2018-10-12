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
            emptyData: false,
            teamId: localStorage.getItem('teamId')
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
            this.getIterationList('');
      }

    getIterationList(e) {
         
          if(e != '') {  
            localStorage.setItem('teamId', e.target.value);
          }

          this.setState({loading: true})

          fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + localStorage.getItem('teamId') + "/_apis/work/teamsettings/iterations", {
            method: "GET",
            headers: global.header
          })
          .then(response => response.json())
          .then( iterationList => {
            this.setState({iterationList: iterationList.value, loading: false});
          })
          
    }
    getWorkItems(e) {
      fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + localStorage.getItem('teamId') + "/_apis/work/teamsettings/iterations/" + e.target.value + "/workitems", {
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
              <li class="list-group-item d-flex justify-content-between align-items-center" key={workItemInfo.id}>
              <span type="button" class="btn-xs btn-circle text-success"> {workItemInfo.id} </span>
              {(workItemInfo.fields['System.WorkItemType'] == 'User Story' ? (<span class="lnr lnr-book text-primary"></span>) : (''))}
              {(workItemInfo.fields['System.WorkItemType'] == 'Bug' ? (<span class="lnr lnr-bug text-danger"></span>) : (''))}
              {(workItemInfo.fields['System.WorkItemType'] == 'Task' ? (<span class="lnr lnr-file-add text-warning"></span>) : (''))}

                <Link to={'/WorkItem/'+ workItemInfo.id} className="whiteText"> {workItemInfo.fields['System.Title']}</Link>

                <span class="badge badge-info">{workItemInfo.fields['System.BoardColumn']}</span>

                {(workItemInfo.fields['Microsoft.VSTS.Scheduling.StoryPoints'] > 0 ? (
                  <span class="badge badge-warning">{workItemInfo.fields['Microsoft.VSTS.Scheduling.StoryPoints']} sp</span>
                ) : (''))}
              </li>
        )}</div>
      }
      return (
          <div>
            <div className="row">
              <div className="col-md-6">
              <span>Select Team : </span>
                  <select id="teamsList" onChange={this.getIterationList}>
                        <option key="">Choose team</option>
                        {this.state.teamsInPod.map(team =>
                          <option key={team.id} value={team.id} selected={this.state.teamId == team.id ? 'selected': ''}>{team.name}</option>
                        )}
                  </select>
              </div>
              <div className="col-md-6">
              <span>Select Iteration : </span>
              {iterationListHtml}
              </div>
            </div>
            <hr></hr>
            <ul class="list-group">
              {workItemDetails}
            </ul>
                  
          </div>
      );
    }
}
export default Teams;
