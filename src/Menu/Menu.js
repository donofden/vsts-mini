import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor() {
        super()
          var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
          console.log('segment_str'+segment_str);
          var segment_array = segment_str.split( '/' );
          console.log('segment_array'+segment_array);
          var last_segment = segment_array.pop();
          console.log('last_segment'+last_segment);
          this.state = {last_segment: last_segment};
    }
    render() {
        const last_segment = this.state.last_segment;
        console.log('last state '+last_segment);
        return (
          <menu>
              <div>  
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="brand">
                        <a href="#">VSTS-MINI</a>
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
                            <select className="form-control">
                                <option value="cheese">Internal Business Systems</option>
                                <option value="tomatoes">Tomatoes</option>
                                <option value="mozarella">Mozzarella</option>
                                <option value="mushrooms">Mushrooms</option>
                                <option value="pepperoni">Pepperoni</option>
                                <option value="onions">Onions</option>
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
                                    <img src="assets/img/user.png" className="img-circle" alt="Avatar"></img>
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
                                    <Link to={'/'}>
                                        <a href="#" className="">
                                            <i className="lnr lnr-home"></i> 
                                            <span>Home</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/TeamChart'}>
                                        <a href="#" className="">
                                            <i className="lnr lnr-chart-bars"></i>
                                            <span>Team Chart</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/Teams'}>
                                        <a href="#" className="active">
                                            <i className="lnr lnr-dice"></i>
                                            <span>Board</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/ReleasePlan'}>
                                        <a href="#" className="">
                                            <i className="lnr lnr-rocket"></i>
                                            <span>Plan</span>
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
