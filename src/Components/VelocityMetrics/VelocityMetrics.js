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
  };
  }
  componentDidMount() {
    let header = new Headers();
    header.append("Authorization", "Basic " + myConfig.vstsToken);
    fetch("https://emisgroup.visualstudio.com/501cfc52-3465-4c0f-854d-41d88ecde81f/_apis/wit/workitems?ids=2061,2072,1740,1720,1907,1769,1790,1761,1771,1320,1972,180,1965,1867,1895,1388", {
      method: "GET",
      headers: header
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
    