import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import ReactHtmlParser from 'react-html-parser';

class WorkItem extends Component {
    constructor(props){
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
        super(props)
          this.state = {
            workItemId: this.props.match.params.id,
            workItemDetails:{},
            workItemComments: '',
            assignedTo: '',
            isDataAvailable: false,
            loading : true
          };
         this.fetchWorkItemComments = this.fetchWorkItemComments.bind(this);
    }
    componentDidMount() {
        fetch("https://emisgroup.visualstudio.com/_apis/wit/workItems/"+this.state.workItemId, {
            method: "GET",
            headers: global.header
        }).then(response => response.json())
          .then(workItemDetails => {
            if(typeof workItemDetails.fields !== "undefined") {
                this.setState({ isDataAvailable: true, loading: false})
                this.setState({ workItemDetails: workItemDetails.fields})
                this.setState({ assignedTo: this.state.workItemDetails['System.AssignedTo'].displayName});
                this.fetchWorkItemComments();
            } else {
                this.setState({ isDataAvailable: false, loading: false})
            }
        })
    }
    fetchWorkItemComments() {
        fetch("https://emisgroup.visualstudio.com/_apis/wit/workItems/"+this.state.workItemId +"/comments", {
            method: "GET",
            headers: global.header
        }).then(response => response.json())
          .then(workItemComments => {
            this.setState({ workItemComments: workItemComments.comments})
        })
    }
    render() {
        let workItemInfo;
        if(this.state.isDataAvailable && !this.state.loading) {
            workItemInfo = <div className="workitem">
            <div className="timeline">
              <div className="column">
                  <div className="title">
                      <h4> ID: {this.state.workItemId}</h4>
                      <h2> {this.state.workItemDetails['System.Title']} </h2>
                  </div>
                  <div className="description">
                      <div><p>{ReactHtmlParser(this.state.workItemDetails['System.Description'])}</p></div>
                      <p> Work Item Type: {this.state.workItemDetails['System.WorkItemType']}</p>
                      <p> Work Item AssignedTo: {this.state.assignedTo}</p>
                      <p> Work Item Current Status: {this.state.workItemDetails['System.BoardColumn']}</p>
                  </div>
                  <div className="custom-tabs-line tabs-line-bottom left-aligned">
                      <ul className="nav" role="tablist">
                          <li className="active"><a href="#tab-bottom-left1" role="tab" data-toggle="tab">
                          Comments</a></li>
                          <li><a href="#tab-bottom-left2" role="tab" data-toggle="tab">Planning <span className="badge">7</span></a></li>
                          <li><a href="#tab-bottom-left2" role="tab" data-toggle="tab">System Info <span className="badge">1</span></a></li>
                      </ul>
                  </div>
                  <div className="tab-content">
                          <div className="tab-pane fade in active" id="tab-bottom-left1">
                              <ul className="list-unstyled activity-timeline">
                              {
                                  this.state.workItemComments.length ?
                                  this.state.workItemComments.map(comments =>
                                  <li>
                                      <img src={comments.revisedBy['imageUrl']} alt="Avatar" className="avatar img-circle activity-icon"></img>
                                      <p>Commented by <a href="#">{comments.revisedBy['displayName']}</a> <span className="timestamp">2 minutes ago</span></p>
                                      <p key={comments.revision}>{ReactHtmlParser(comments.text)}</p>
                                  </li>
                                  ) : ""
                              }
                              </ul>
                              <div className="margin-top-30 text-center"><a href="#" className="btn btn-default">See all activity</a></div>
                          </div>
                          <div className="tab-pane fade" id="tab-bottom-left2">
                              <div className="table-responsive">

                              <ul className="list-unstyled list-justify">
                                  <li>Story Points <span>8</span></li>
                                  <li>Priority <span>2</span></li>
                                  <li>Risk <span>Medium</span></li>
                                  <li>Value Area <span>Business</span></li>
                              </ul>

                              </div>
                          </div>
                      </div>
              </div>
          </div>
        </div>
        } else if(!this.state.isDataAvailable && !this.state.loading) {
            workItemInfo =  <div className="workitem text-center">
                <div className="timeline">
                    <div className="column">
                        <div className="title">
                            <h2> No results found!!!</h2>
                            </div>
                        </div>
                    </div>
            </div>
        } else {
            workItemInfo = <div className="text-center"><img alt="Build Definitions" src="../assets/img/build-load-icon.gif"></img></div>
        }
        return (
            <div> {workItemInfo} </div>
      );
    }
}
export default WorkItem;
