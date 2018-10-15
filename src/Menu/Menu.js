import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { myConfig } from '../config.js';
import Groups from '../Components/Groups/Groups';

class Menu extends Component {
    constructor(props) {
        global.header = new Headers();
        global.header.append("Authorization", "Basic " + myConfig.vstsToken);
        if (localStorage.getItem('teamId') == ''){
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
                    <div class="brand">
                    <Link to={'/'} className={last_segment == "" ? "active" : ""}>
                        <a href="index.html"><img src="../assets/img/logo.png" alt="VSTS-MINI" class="img-responsive logo"></img></a>
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
                                <option key={team.id} value={team.id} selected={this.state.tempStorage == team.id ? 'selected': ''}>{team.name}</option>
                                )}
                            </select>
                        </form>
                        <div id="navbar-menu">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="container-fluid">
                                    
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="lnr lnr-question-circle"></i> 
                                        <span>Help</span> 
                                        <i className="icon-submenu lnr lnr-chevron-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Basic Use</a></li>
                                        <li><a href="#">Working With Data</a></li>
                                        <li><a href="#">Security</a></li>
                                        <li><a href="#">Troubleshooting</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/img/user.png" className="img-circle" alt="Avatar"></img>
                                        <span>Guest</span>
                                        <i className="icon-submenu lnr lnr-chevron-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" data-toggle="modal" data-target="#myModal"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
                                        <li><a href="#"><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
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
                                    <Link to={'/'} className={last_segment == "" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-home"></i> 
                                            <span>Home</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/TeamChart'} className={last_segment == "TeamChart" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-chart-bars"></i>
                                            <span>Team Chart</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/Teams'} className={last_segment == "Teams" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-dice"></i>
                                            <span>Board</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/ReleasePlan'}  className={last_segment == "ReleasePlan" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-rocket"></i>
                                            <span>Plan</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/BuildDefinition'}  className={last_segment == "BuildDefinition" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-rocket"></i>
                                            <span>Build</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/Groups'}  className={last_segment == "Groups" ? "active" : ""}>
                                        <a>
                                            <i className="lnr lnr-rocket"></i>
                                            <span>Groups</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">App Settings</h4>
                        </div>
                        <div class="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Save changes</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
