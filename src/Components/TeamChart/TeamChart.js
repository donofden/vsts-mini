import React, { Component } from 'react'

class TeamChart extends Component {
    render() {
      return (
         <div>
            <h2>Team Chart</h2>
            <p><img className="velocity-img" alt="Sprint Velocity" src="https://emisgroup.visualstudio.com/501cfc52-3465-4c0f-854d-41d88ecde81f/_api/_teamChart/Velocity?chartOptions=%7B%22Width%22%3A1229%2C%22Height%22%3A586%2C%22ShowDetails%22%3Atrue%2C%22Title%22%3A%22%22%7D&counter=2&teamId=68870025-4d67-4f1f-9a65-2664497e3df2&iterationsNumber=5&__v=5"></img></p>
         </div>
      );
   }
}
export default TeamChart;