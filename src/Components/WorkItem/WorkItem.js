import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import './WorkItem.css';
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

        return (
          <div className="workitem">
              <div className="timeline">
                <div className="column">
                    <div className="title">
                        <h1> ID: {this.state.workItemId}</h1>
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
                        <p>
                        <a href="javascript:void(0)" onClick={this.fetchWorkItemComments}>Comments</a>
                        </p>
                            {this.state.workItemComments.length ?
                                this.state.workItemComments.map(comments =>
                                   <div><p>{ReactHtmlParser(comments.text)}</p></div>
                                  ) : ""
                        }
                    </div>
                </div>
            </div>
          </div>
      );
    }
}
export default WorkItem;
