import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { myConfig } from '../config.js';

class Menu extends Component {
    constructor(props) {
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
        if (localStorage.getItem('teamId') === ''){
            localStorage.setItem('teamId', myConfig.teamId);
        }
        super(props);
          this.state = {
              teamsInPod: [],
              tempStorage: localStorage.getItem('teamId'),
              teamsMembers: []
            };
        this.setTeams = this.setTeams.bind(this);
    }
    componentDidMount() {
        let header = new Headers();
        header.append("Authorization", "Basic " + myConfig.vstsToken);
          fetch("https://" + myConfig.accountName + ".visualstudio.com/_apis/teams?api-version=4.1-preview.2", {
            method: "GET",
            headers: header
          }).then(response => response.json())
            .then( teamsInPod => {
                this.setState({teamsInPod: teamsInPod.value})
            }
          )
      }
      setTeams(e){
        localStorage.setItem('teamId', e.target.value);
        window.location.reload();
        //Groups.prototype.getTeamMembers();
      }

    render() {
        // Re-Size Dashboard
        document.body.className = "layout-fullwidth";
        
        let segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
        let segment_array = segment_str.split( '/' );
        let last_segment = segment_array.pop();
        return (
          <menu>
              <div>  
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="brand">
                    <Link to={'/'} className={last_segment === "" ? "active" : ""}>
                        <img src="../assets/img/logo.png" alt="VSTS-MINI" className="img-responsive logo"></img>
                    </Link>
                    </div>
			        <div className="container-fluid">
                        <div className="navbar-btn">
                            <button type="button" className="btn-toggle-fullwidth"><i className="lnr lnr-arrow-left-circle"></i></button>
                        </div>
                        <form className="navbar-form navbar-left">
                            <div className="input-group">
                                <input type="text" value="" className="form-control" placeholder="Search dashboard..."></input>
                                <span className="input-group-btn"><button type="button" className="btn btn-primary">Go</button></span>
                            </div>
                        </form>
                        <form className="navbar-form navbar-left">
                            <select className="form-control" onChange={this.setTeams}>
                                {this.state.teamsInPod.map(team =>
                                <option key={team.id} value={team.id} selected={this.state.tempStorage === team.id ? 'selected': ''}>{team.name}</option>
                                )}
                            </select>
                        </form>
                        <div id="navbar-menu">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="container-fluid">
                                    
                                </li>
                                <li className="dropdown">
                                    <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="lnr lnr-question-circle"></i> 
                                        <span>Help</span> 
                                        <i className="icon-submenu lnr lnr-chevron-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/">Basic Use</a></li>
                                        <li><a href="/">Working With Data</a></li>
                                        <li><a href="/">Security</a></li>
                                        <li><a href="/">Troubleshooting</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/img/user.png" className="img-circle" alt="Avatar"></img>
                                        <span>Guest</span>
                                        <i className="icon-submenu lnr lnr-chevron-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/" data-toggle="modal" data-target="#myModal"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
                                        <li><a href="/"><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
			        </div>
		        </nav>
                <div className="sidebar" id="sidebar-nav">
                    <div className="sidebar-scroll">
                        <nav>
                            <ul className="nav">
                                <li>
                                    <Link to={'/'} className={last_segment === "" ? "active" : ""}>
                                            <i className="lnr lnr-home"></i> 
                                            <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/TeamChart'} className={last_segment === "TeamChart" ? "active" : ""}>
                                            <i className="lnr lnr-chart-bars"></i>
                                            <span>Team Chart</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/Teams'} className={last_segment === "Teams" ? "active" : ""}>
                                            <i className="lnr lnr-dice"></i>
                                            <span>Board</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/ReleasePlan'}  className={last_segment === "ReleasePlan" ? "active" : ""}>
                                            <i className="lnr lnr-rocket"></i>
                                            <span>Plan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/BuildDefinition'}  className={last_segment === "BuildDefinition" ? "active" : ""}>
                                            <i className="fa fa-random"></i>
                                            <span>Build</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/Groups'}  className={last_segment === "Groups" ? "active" : ""}>
                                            <i className="lnr lnr-user"></i>
                                            <span>Groups</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/VelocityMetrics'}  className={last_segment === "VelocityMetrics" ? "active" : ""}>
                                            <i className="fa fa-line-chart"></i>
                                            <span>Velocity Metrics</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">App Settings</h4>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </menu>
        );
      }
}

export default Menu;
