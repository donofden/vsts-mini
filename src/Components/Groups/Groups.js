import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class Groups extends Component {
    constructor(props){
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
          super(props)
            this.state = {
              teamsMembers: [],
              iterationList: [],
              loading: true,
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
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
          fetch("https://" + myConfig.rootUrl + "/"+ myConfig.accountName+"/_apis/projects/"+ myConfig.projectId +"/teams/"+ localStorage.getItem('teamId') +"/members?api-version=4.1", {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then((teamsMembers) => {
                this.setState({teamsMembers: teamsMembers.value})
                if(this.state.teamsMembers.length > 0) {
                    this.setState({ emptyData: true, loading: false})
                }
                else {
                    this.setState({ emptyData: false, loading: false})
                }
            })
      }
    render() {
        let groupData;
        if(this.state.emptyData && !this.state.loading) {
            groupData = this.state.teamsMembers.map(member =>
                <div className="col-xs-12 col-sm-6 col-md-3" key={member.identity['id']}>
                <div className="image-flip" ontouchstart="this.classList.toggle('hover')">
                    <div className="mainflip">
                        <div className="frontside">
                            <div className="card">
                                <div className="card-body text-center">
                                    <p><img className="img-fluid" src={member.identity['imageUrl']+"&size=2"} alt="Member Identity" /></p>
                                    <h4 className="card-title">{member.identity['displayName']}</h4>
                                    <p className="card-text">{member.identity['uniqueName']}</p>
                                </div>
                            </div>
                        </div>
                        <div className="backside">
                            <div className="card">
                            <div className="card-body text-center">
                                    <p><img className="img-fluid" src={member.identity['imageUrl']+"&size=2"} alt="Member Identity" /></p>
                                    <h4 className="card-title">{member.identity['displayName']}</h4>
                                    <p className="card-text">{member.identity['uniqueName']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
         } else if(!this.state.emptyData && !this.state.loading) {
            groupData = <div className="text-center"><h3>No results found!!!</h3></div>
         } else {
            groupData = <div className="text-center"><img alt="Group members" src="../assets/img/build-load-icon.gif"></img></div>
        }
      return (
         <div>
            <h2>Groups</h2>
            <section id="team" className="pb-5">
                <div className="container">
                    <div className="row">
                        {groupData}
                    </div>
                </div>
            </section>
        </div>
      );
   }
}
export default Groups;