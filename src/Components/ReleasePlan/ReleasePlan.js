import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class ReleasePlan extends Component {
    constructor(){
        super()
          this.state = {
            vstsToken: myConfig.vstsToken,
            accountName: myConfig.accountName,
            project: myConfig.project,
            planID: myConfig.planID,
            planData: [],
            release: [],
            time: {},
            seconds: 0,
            name: '',
            color: ''
          };
          this.vsts = 0;
          this.timer = 0;
          this.startTimer = this.startTimer.bind(this);
          this.countDown = this.countDown.bind(this);
        }
    
      componentDidMount() {
          let timeLeftVar = this.secondsToTime(this.state.seconds);
          this.setState({ time: timeLeftVar });
          let header = new Headers();
          header.append("Authorization", "Basic " + myConfig.vstsToken);
          
          fetch("https://" + myConfig.accountName + ".visualstudio.com/" + myConfig.project + "/_apis/work/plans/" + myConfig.planID, {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then((planData) => {
              if (planData.properties.markers.length) {
                  this.setState({planData: planData.properties.markers})
                  let release = this.findNextRelease();

                  let now = new Date().getTime();
                  let mydate = new Date(release[0].date).getTime();
                  let countDownDate = (mydate - now) / 1000;
                  this.setState({name: release[0].label, color: release[0].color});
                  this.setState({seconds: countDownDate});
                }
            })
      }
    
      findNextRelease(){
        let returnval = this.renderPlan();
        if(returnval.length){
          return returnval;
        }
      }
      renderPlan() {
        let release = [];
        let i = 0;
        let calculationLogic = this.state.planData.map(function(plan) {
          var givenTime = Date.parse(plan.date);
          var currentTime = Date.parse(new Date());
    
          if (givenTime > currentTime) {
              var arrayKey = givenTime - currentTime;
              release[i] = plan;
              plan.timeDiff = arrayKey;
              i++;
          }
    
          let crmPlans = plan.label.toLowerCase();
            if (crmPlans.indexOf("crm") > -1) {
              return <tr key={plan.date}>
                <td>{crmPlans}</td>
                <td>{plan.date}</td>
                <td><a style={{backgroundColor: plan.color}}>{plan.color}{plan.color}</a></td>
              </tr>
            }
        });
        let newData  = release.slice(0, 1).map(function(plan) {
          return plan;
        });
        this.countDown;
        return newData;
      }
    
      secondsToTime(secs){
    
        let days = Math.floor((secs / 86400));
        let divisor_for_days = secs % 86400;
        let hours = Math.floor((divisor_for_days / 3600));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "d": days,
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      startTimer() {
        this.findNextRelease();
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        // Check if we're at zero.
        if (seconds === 0) {
          clearInterval(this.timer);
        }
      }
   render() {
    let releaseContent =  '';

    if(typeof(planData) == 'undefined') {
      releaseContent = <div>
        <div className="topleft">
          <p><img alt="No data" src="./images/nodata.gif"></img></p>
        </div>
      </div>
    } else {
        releaseContent = <div className="bgimg">
          <div className="topleft">
              <p>VSTS Delivery Timeline View</p>
          </div>
          <div className="middle">
            <h1>Development Tooling and Engineering POD</h1>
            <hr></hr>
            <h3>Next Release</h3>
            <h2 id="team" className="h2-style">
            <p style={{color: this.state.color}}>{this.state.name}</p>
            {this.state.time.d}d {this.state.time.h}h {this.state.time.m}m {this.state.time.s}s {this.startTimer()}</h2>
            <p id="release" className="p-release-style"></p>
          </div>
      </div>
    }
    return ( releaseContent);
   }
}
export default ReleasePlan;
