import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
    constructor() {
        super()
          this.state = {
            mastHeadHeaderCss: 'masthead header-css',
            hamburgerBoring :'hamburger hamburger--boring',
            siteNav : 'site-nav nav-new-css'
          };
          this.resetMenu = this.resetMenu.bind(this);
    }

    resetMenu() {
        let bodyClassElements = document.getElementsByClassName("masthead")[0].className;

        if (bodyClassElements.indexOf('is-active') > 0 ) {
            this.setState({
                mastHeadHeaderCss: 'masthead header-css',
                hamburgerBoring: 'hamburger hamburger--boring',
                siteNav : 'site-nav nav-new-css'
            })
        }
    }
    render() {
        let mastHeadHeaderCss = this.state.mastHeadHeaderCss;
        let hamburgerBoring = this.state.hamburgerBoring;
        let siteNav = this.state.siteNav;

        return (
          <menu>
              <div>
              <div className="hero">
                    <div className={mastHeadHeaderCss} role="banner">
                    <div className="container">
                    <div>
                        <button className={hamburgerBoring} type="button" onClick={this.testMenu}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                        <span className="hamburger-label">Menu</span>
                        </button>
                    </div>
                    <div className="masthead-search form-css">
                    <input type="search" name="s" aria-labelledby="search-label" placeholder="Search&hellip;" className="draw"></input>
                        <button type="submit">&rarr;</button>
                        </div>
                        <div className={siteNav} role="navigation">
                        <div className="col">
                            <h4>Expertise</h4>
                            <ul>
                            <li onClick={this.resetMenu}><Link to={'/ReleasePlan'}>Release Plan</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/'}>Home</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/ReleasePlan'}>Release Plan</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/TeamChart'}>Team Chart</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/Iterations'}>Sprint Iterations</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/Teams'}>Teams</Link></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Results</h4>
                            <ul>
                            <li onClick={this.resetMenu}><Link to={'/Trello'}>Trello</Link></li>
                            <li onClick={this.resetMenu}><Link to={'/WorkItem'}>WorkItem</Link></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Company</h4>
                            <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Our Team</a></li>
                            <li><a href="#">Our Culture</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Join Us</a></li>
                            </ul>   
                        </div>
                        <div className="col">
                            <h4>Approach</h4>
                            <ul>
                            <li><a href="#">Digital Transformation</a></li>
                            <li><a href="#">Digital Readiness Tool</a></li>
                            <li><a href="#">Solution Partners</a></li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="social">
                            <li><a href="">hi</a></li>
                            <li><a href="">hi</a></li>
                            <li><a href="">hi</a></li>
                            </ul>
                        </div>
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
