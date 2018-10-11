import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';

class WorkItem extends Component {
    constructor(props){
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
        super(props)
          this.state = {
            workItemId: '',
            workItemDetails: '',
            workItemComments: ''
          };
          this.fetchWorkItemComments = this.fetchWorkItemComments.bind(this);
    }
    componentDidMount() {
        this.setState({workItemId: this.props.match.params.id})
        fetch("https://emisgroup.visualstudio.com/_apis/wit/workItems/"+this.props.match.params.id, {
            method: "GET",
            headers: global.header
        }).then(response => response.json())
          .then(workItemDetails => {
              this.setState({ workItemDetails: workItemDetails.fields })
        })
    }
    fetchWorkItemComments() {
        fetch("https://emisgroup.visualstudio.com/_apis/wit/workItems/"+this.state.workItemId +"/comments", {
            method: "GET",
            headers: global.header
        }).then(response => response.json())
          .then(workItemComments => {
              this.setState({ workItemComments: workItemComments.comments })
        })
    }
    render() {
        const workItemDescription = this.state.workItemDetails['System.Description'];
        console.log(this.state.workItemComments);
        return (
          <div className="workitem">
              <div className="timeline">
                <div className="column">
                    <div className="title">
                        <h4> ID: {this.state.workItemId}</h4>
                        <h2> {this.state.workItemDetails['System.Title']} </h2>
                    </div>
                    <div className="description">
                        <div><p>{ReactHtmlParser(workItemDescription)}</p></div>
                        <p> Work Item Type: {this.state.workItemDetails['System.WorkItemType']} </p>
                        <p>
                            Work Item AssignedTo: {this.state.workItemDetails['System.AssignedTo']}
                        </p>
                        <p>
                            Work Item Current Status: {this.state.workItemDetails['System.BoardColumn']}
                        </p>
                    </div>
                    <div class="custom-tabs-line tabs-line-bottom left-aligned">
                        <ul class="nav" role="tablist">
                            <li class="active"><a href="#tab-bottom-left1" role="tab" data-toggle="tab">
                            Comments</a></li>
                            <li><a href="#tab-bottom-left2" role="tab" data-toggle="tab">Planning <span class="badge">7</span></a></li>
                            <li><a href="#tab-bottom-left2" role="tab" data-toggle="tab">System Info <span class="badge">1</span></a></li>
                        </ul>
                    </div>

                    <div class="tab-content">
                            <div class="tab-pane fade in active" id="tab-bottom-left1">
                            {this.fetchWorkItemComments()}
                                <ul class="list-unstyled activity-timeline">
                                {
                                    this.state.workItemComments.length ?
                                    this.state.workItemComments.map(comments =>
                                    <li>
                                        <img src={comments.revisedBy['imageUrl']} alt="Avatar" class="avatar img-circle activity-icon"></img>
                                        <p>Commented by <a href="#">{comments.revisedBy['displayName']}</a> <span class="timestamp">2 minutes ago</span></p>
                                        <p key={comments.revision}>{ReactHtmlParser(comments.text)}</p>
                                    </li>
                                    ) : ""
                                }
                                </ul>
                                <div class="margin-top-30 text-center"><a href="#" class="btn btn-default">See all activity</a></div>
                            </div>
                            <div class="tab-pane fade" id="tab-bottom-left2">
                                <div class="table-responsive">

                                <ul class="list-unstyled list-justify">
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
      );
    }
}
export default WorkItem;
