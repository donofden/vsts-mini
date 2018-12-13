import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import Countdown from 'react-countdown-now';

class ReleasePlan extends Component {
    constructor(){
        super()
          this.state = {
            vstsToken: myConfig.vstsToken,
            accountName: myConfig.accountName,
            project: myConfig.project,
            planID: myConfig.planID,
            releaseName: '',
            releasePlanColor: '',
            releaseCountDown: 0,
            isDataAvailable: false,
            loading : true
          };
    }
    componentDidMount() {
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
        var currentDate = Date.parse(new Date());

        fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/_apis/work/plans/" + myConfig.planID, {
          method: "GET",
          headers: header
        }).then(response => response.json())
          .then((planData) => {
           let releaseTime = []; let planName = []; let planColor = [];
           if(planData.properties.markers.length > 0) {
                planData.properties.markers.filter(function(plan) {
                    var sliceReleaseDate = plan.date.slice(0, -1);
                    var releaseDate = Date.parse(sliceReleaseDate);
                    var planLabel = plan.label.toLowerCase();

                    if (releaseDate > currentDate && planLabel.indexOf("release") > -1) {
                        releaseTime.push(releaseDate)
                        planName.push(plan.label)
                        planColor.push(plan.color)
                    }
                    return true;
                });
                this.setState({releaseCountDown: releaseTime[0], releaseName: planName[0], releasePlanColor: planColor[0]});
                this.setState({ isDataAvailable: true, loading: false})
           }
           if(!this.state.releaseCountDown) {
            this.setState({ isDataAvailable: false, loading: false})
           }
        })
    }

   render() {
        if(this.state.releaseCountDown && this.state.releaseName && this.state.isDataAvailable && !this.state.loading) {
            const renderer = ({ days, hours, minutes, seconds }) => {
                return <div className="row">
                    <div className="col-md-3 col-sm-6"></div>
                    <div className="col-md-6 col-sm-6">
                        <div className="col-md-3 col-sm-6 count-down">
                            <div className="award-item">
                                <div className="">
                                    <h1> {days}</h1>
                                </div>
                                <span>Days</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 count-down">
                            <div className="award-item">
                                <div className="">
                                    <h1> {hours}</h1>
                                </div>
                                <span>Hours</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 count-down">
                            <div className="award-item">
                                <div className="">
                                    <h1> {minutes}</h1>
                                </div>
                                <span>Minutes</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 count-down">
                            <div className="award-item">
                                <div className="">
                                    <h1> {seconds}</h1>
                                </div>
                                <span>Seconds</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6"></div>
                </div>
            };
                return (
                    <div>
                        <div className="container text-center">
                            <h3 className="text-muted text-center">VSTS Delivery Timeline View</h3>
                            <h2 className="text-success text-center">Development Tooling and Engineering POD</h2>
                            <hr></hr>
                            <br></br>
                            <h3 className="text-muted text-center">Next Release</h3>
                            <br></br>
                            <h2 className="text-center" style={{color: this.state.releasePlanColor}}>{this.state.releaseName}</h2>
                            <br></br>
                        </div>
                        <div className="awards">
                            <Countdown date={this.state.releaseCountDown} daysInHours={false} renderer={renderer}/>
                        </div>
                    </div>
                )
        } else if(!this.state.isDataAvailable && !this.state.loading) {
            return (
                <div>
                    <div className="container text-center">
                        <h3 className="text-muted text-center">There is no release plans at the moment</h3>
                        <h3 className="text-success text-muted text-center">Please go and create your release plan in VSTS</h3>
                        <br></br>
                    </div>
                    <div className="awards">
                        <div className="text-center"><img alt="Release Plan" src="../assets/img/release_plan.gif"></img></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="text-center"><img alt="Build Definitions" src="../assets/img/build-load-icon.gif"></img></div>
            )
        }
    }
}
export default ReleasePlan;
