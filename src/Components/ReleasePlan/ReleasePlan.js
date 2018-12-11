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
          this.setState({apiData: ''});
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
                  this.setState({apiData: this.state.planData.length});
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
         this.state.planData.map(function(plan) {
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
            } else {
              return '';
            }
        });
        let newData  = release.slice(0, 1).map(function(plan) {
          return plan;
        });
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
    if(this.state.apiData === 0 ) {
      releaseContent = <div>
        <div className="topleft">
          <h1>No Data to show</h1>
        </div>
      </div>
    } else {
        releaseContent = <div>
          <div className="container text-center">
              <h3 className="text-muted text-center">VSTS Delivery Timeline View</h3>
              <h2 className="text-success text-center">Development Tooling and Engineering POD</h2>
              <hr></hr>
              <br></br>
              <h3 className="text-muted text-center">Next Release</h3>
              <br></br>
              <h2 className="text-center" style={{color: this.state.color}}>{this.state.name}</h2>
              <br></br>
        </div>
        <br></br>
        {this.startTimer()}
        <div className="awards">
            <div className="row">
            <div className="col-md-3 col-sm-6"></div>
            <div className="col-md-6 col-sm-6">
              <div className="col-md-3 col-sm-6 count-down">
                <div className="award-item">
                  <div className="">
                    <h1> {this.state.time.d}</h1>
                  </div>
                  <span>Days</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 count-down">
                <div className="award-item">
                  <div className="">
                  <h1> {this.state.time.h}</h1>
                  </div>
                  <span>Hours</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 count-down">
                <div className="award-item">
                  <div className="">
                  <h1> {this.state.time.m}</h1>
                  </div>
                  <span>Minutes</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 count-down">
                <div className="award-item">
                  <div className="">
                  <h1> {this.state.time.s}</h1>
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6"></div>
            </div>
          </div>
      </div>
    }
    return (releaseContent);
   }
}
export default ReleasePlan;
