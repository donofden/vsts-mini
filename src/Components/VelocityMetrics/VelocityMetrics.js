import React from 'react';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import { myConfig } from '../../config.js';

// Resolves charts dependancy
charts(fusioncharts);


class VelocityMetrics extends React.Component {
  constructor(props){
    super(props);
    global.header = new Headers();
    global.header.append("Authorization", "Basic " + myConfig.vstsToken);
    this.state = {
      doing: [],
      backlog: [],
      readyToTest: [],
      stuck: [],
      done:[],
      dataSource: {},
      emptyData: false,
      currentIteration:'',
  };
  }
  componentDidMount() {
    fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + localStorage.getItem('teamId') + "/_apis/work/teamsettings/iterations/?$timeframe=current&api-version=4.1", {
            method: "GET",
            headers: global.header
      }).then(response => response.json())
        .then(currentIteration => {
          //Since the current sprint doesn't have any work items manually I used the past sprint id for data visualisation
          this.setState({currentIteration: "c5575217-e6a4-4822-b819-fb1136ae3b85"})

          //this.setState({currentIteration: currentIteration.value[0]['id']})
          this.getCurrentIterationWorkItems();
        })
  }
  getCurrentIterationWorkItems() {
    fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/" + localStorage.getItem('teamId') + "/_apis/work/teamsettings/iterations/" + this.state.currentIteration + "/workitems", {
            method: "GET",
            headers: global.header
      }).then(response => response.json())
        .then( iterationWorkItems => {
            var workItemIds = [];
            if (iterationWorkItems.hasOwnProperty("workItemRelations") && iterationWorkItems.workItemRelations.length > 0) {
              this.setState({emptyData: false});
                for (var workItem of iterationWorkItems.workItemRelations) {
                  workItemIds.push(workItem.target.id);
                }
              this.getWorkItemFullDetails(workItemIds.join(','));
            } else {
              this.setState({emptyData: true});
            }
        })
  }
  getWorkItemFullDetails(workItemIds) {
    fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/_apis/wit/workitems?ids=" + workItemIds, {
      method: "GET",
      headers: global.header
    }).then(response => response.json())
      .then(workItems => {
        workItems.value.forEach(element => {
          switch(element.fields['System.State']){
            case "New":
              this.state.backlog.push(element)
              break;
            case "Active":
              this.state.doing.push(element)
              break;
            case "Resolved":
              this.state.readyToTest.push(element)
              break;
            case "Closed":
              this.state.done.push(element)
              break;
            default:
          }
      });
      let totalItemsInBacklog = this.state.backlog.length;
      let totalItemsInDoing = this.state.doing.length;
      let totalItemsInReadyToTest = this.state.readyToTest.length;
      let totalItemsInDone = this.state.done.length;

      this.setState({dataSource: {"chart": {
          "caption": "Burn down chart",
          "plottooltext": "<b>$percentValue</b>",
          "showlegend": "1",
          "showpercentvalues": "1",
          "legendposition": "bottom",
          "usedataplotcolorforlabels": "1",
          "theme": "zune",
          "width": "100%",
          "height": "100%",
          "bgColor": "#FFFFFF",
          "showBorder": "0",
        },
        "data": [
          {
            "label": "Backlog",
            "value": totalItemsInBacklog,
            "color": "#EF9BF2"
          },
          {
            "label": "Doing",
            "value": totalItemsInDoing,
            "color": "#72B2F3"
          },
          {
            "label": "Ready To Test",
            "value": totalItemsInReadyToTest,
            "color": "#57E397"
          },
          {
            "label": "Done",
            "value": totalItemsInDone,
            "color": "#F45D79"
          }
        ]}
      });
   });
  }

  render() {
      return (
            <div className="container">
              <ReactFusioncharts
          type = "pie2d"
          width = '1060'
          height = '500'
          dataFormat = "JSON"
          dataSource = {this.state.dataSource} />
          </div>
      );
   }
}
export default VelocityMetrics;
    