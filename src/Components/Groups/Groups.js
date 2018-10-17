import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import { Link } from 'react-router-dom';

class Groups extends Component {
    constructor(props){
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
          super(props)
            this.state = {
              teamsMembers: [],
              iterationList: [],
              loading: false,
              iterationWorkItems: [],
              workItemDetails: [],
              emptyData: false,
              teamId: localStorage.getItem('teamId')
            };
            this.getTeamMembers = this.getTeamMembers.bind(this);
      }
      componentDidMount() {
        this.getTeamMembers();
      }
      getTeamMembers() {
        var self = this;
        let header = new Headers();
        let result;
        header.append("Authorization", "Basic " + myConfig.vstsToken);
        // https://dev.azure.com/{organization}/_apis/projects/{projectId}/teams/{teamId}/members?api-version=4.1
        console.log("https://" + myConfig.rootUrl + "/"+ myConfig.accountName+"/_apis/projects/"+ myConfig.projectId +"/teams/"+ localStorage.getItem('teamId') +"/members?api-version=4.1");
          fetch("https://" + myConfig.rootUrl + "/"+ myConfig.accountName+"/_apis/projects/"+ myConfig.projectId +"/teams/"+ localStorage.getItem('teamId') +"/members?api-version=4.1", {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then((teamsMembers) => {
                this.setState({teamsMembers: teamsMembers.value})
            })
      }
    render() {
      return (
         <div>
            <h2>Groups</h2>
            <section id="team" class="pb-5">
                <div class="container">
                    <div class="row">
                        {this.state.teamsMembers.map(member =>

                        <div class="col-xs-12 col-sm-6 col-md-3">
                            
                        <div class="image-flip" key={member.identity['id']} ontouchstart="this.classList.toggle('hover');">
                            <div class="mainflip">
                                <div class="frontside">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <p><img class="img-fluid" src={member.identity['imageUrl']+"&size=2"} alt="card image" /></p>
                                            <h4 class="card-title">{member.identity['displayName']}</h4>
                                            <p class="card-text">{member.identity['uniqueName']}</p>
                                            {/* <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="backside">
                                    <div class="card">
                                    <div class="card-body text-center">
                                            <p><img class="img-fluid" src={member.identity['imageUrl']+"&size=2"} alt="card image" /></p>
                                            <h4 class="card-title">{member.identity['displayName']}</h4>
                                            <p class="card-text">{member.identity['uniqueName']}</p>
                                            {/* <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
      );
   }
}
export default Groups;