import React, { Component } from 'react';


class TeamChart extends Component {
   componentDidMount() {
    let bodyClassElements = document.body.classList;
    if (bodyClassElements.value == 'nav-active') {
        bodyClassElements.remove('nav-active');
      }
   }
    render() {
      return (
         <div>
            <h2>Team Chart</h2>
            <p><img src="https://emisdevtools.visualstudio.com/Objectives/287c536c-bbe0-458a-96df-d0fb1723eb36/_api/_teamChart/Velocity?chartOptions=%7B%22Width%22%3A1246%2C%22Height%22%3A586%2C%22ShowDetails%22%3Atrue%2C%22Title%22%3A%22%22%7D&counter=3&teamId=c3c4741e-484f-4255-bf36-d0db9bf656bd&iterationsNumber=5&__v=5"></img></p>
         </div>
      );
   }
}
export default TeamChart;