import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class BuildDefinition extends Component {
    constructor(){
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
          super()
            this.state = {
                buildDetails: [],
                buildDefinitions: [],
                emptyData: false,
                loading: false
            };
        this.getBuildDetails = this.getBuildDetails.bind(this);
      }
    componentDidMount() {
          let header = new Headers();
          header.append("Authorization", "Basic " + myConfig.vstsToken);
            fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/_apis/build/definitions?api-version=4.1", {
              method: "GET",
              headers: header
            }).then(response => response.json())
            .then( buildDetails => {
                let buildIds = [];
    
                if (typeof(buildDetails.value) === "undefined") {
                  this.setState({emptyData: true});
                } else {
                  this.setState({emptyData: false});
                  for (var build of buildDetails.value) {
                    buildIds.push(build.id);
                  }
                  console.log(buildIds.join(','))
                  this.getBuildDetails(buildIds.join(','));
                }
            })
        }
    getBuildDetails(buildIds) {
        this.setState({loading: true});
        fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.projectId + "/_apis/build/Builds?definitions=" + buildIds + "&resultFilter=2&maxBuildsPerDefinition=1", {
                  method: "GET",
                  headers: global.header
            }).then(response => response.json())
              .then(buildDefinitions => this.setState({buildDefinitions: buildDefinitions.value, loading: false}))
    }
    render() {
        let buildDefinitionHtml;
        if (this.state.loading) {
            buildDefinitionHtml = <div class="text-center"><img alt="Build Definitions" src="../assets/img/build-load-icon.gif"></img></div>
          } else {
            buildDefinitionHtml = <span>
                <div class="col-sm-3">
                    <div class="tile-progress tile-red">
                        <div class="tile-header">
                            <h3>pfs (Demo)</h3>
                            <span>refs/heads/mast...</span>
                            <br />
                                <span>Graham Allwood</span>
                        </div>
                        <div class="tile-progressbar">
                            <span data-fill="65.5%"></span>
                        </div>
                        <div class="tile-footer">
                            <h4>
                                <span class="pct-counter">Failed</span>
                            </h4>
                        </div>
                    </div>
                </div>
            {this.state.buildDefinitions.map(definition =>
                <div class="col-sm-3">
                    <div class="tile-progress tile-green">
                        <div class="tile-header">
                            <h3>{(definition.definition.name.length > 15) ? definition.definition.name.substr(0,15) + "..." : definition.definition.name}</h3>
                                <span>{(definition.sourceBranch.length > 15) ? definition.sourceBranch.substr(0,15) + "..." : definition.sourceBranch}</span><br />
                                <span>{definition.requestedBy['displayName']}</span>
                        </div>
                        <div class="tile-progressbar">
                            <span data-fill="65.5%" style={progressStyle}></span>
                        </div>
                        <div class="tile-footer">
                            <h4>
                                <span class="pct-counter">{definition.result}</span>
                            </h4>
                        </div>
                    </div>
                </div>
            )}
            </span>
          }
        var progressStyle = {width: '30%'};
        return (
            <div>
                <div class="container">
                    <div class="row">
                        {buildDefinitionHtml}
                    </div>
                </div>
            </div>
        );
    }
}
export default BuildDefinition;
