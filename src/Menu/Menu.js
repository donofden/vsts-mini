import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Components/Home/Home';
import ReleasePlan from '../Components/ReleasePlan/ReleasePlan';
import TeamChart from '../Components/TeamChart/TeamChart'
import Iterations from '../Components/Iterations/Iterations';
import Teams from '../Components/Teams/Teams';
import './Menu.css';

class Menu extends Component {
    componentDidMount() {
        var app = function () {
            var body = void 0;
            var menu = void 0;
            var menuItems = void 0;
        
            var init = function init() {
                body = document.querySelector('body');
                menu = document.querySelector('.menu-icon');
                menuItems = document.querySelectorAll('.nav__list-item');
        
                applyListeners();
            };
        
            var applyListeners = function applyListeners() {
                menu.addEventListener('click', function () {return toggleClass(body, 'nav-active');});
            };
        
            var toggleClass = function toggleClass(element, stringClass) {
                if (element.classList.contains(stringClass))
                element.classList.remove(stringClass);else
        
                element.classList.add(stringClass);
            };
        
            init();
        }();
    }

    render() {
        return (
          <div>
                <div className="menu-icon">
                <span className="menu-icon__line menu-icon__line-left"></span>
                <span className="menu-icon__line"></span>
                <span className="menu-icon__line menu-icon__line-right"></span>
            </div>

            <div className="nav">
                <div className="nav__content">
                <Router>
                    <div>
                        <ul className="nav__list">
                            <li className="nav__list-item"><Link to={'/'}>Home</Link></li>
                            <li className="nav__list-item"><Link to={'/ReleasePlan'}>Release Plan</Link></li>
                            <li className="nav__list-item"><Link to={'/TeamChart'}>Team Chart</Link></li>
                            <li className="nav__list-item"><Link to={'/Iterations'}>Sprint Iterations</Link></li>
                            <li className="nav__list-item"><Link to={'/Teams'}>Teams</Link></li>
                        </ul>
                    
                    <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/ReleasePlan' component={ReleasePlan} />
                            <Route exact path='/TeamChart' component={TeamChart} />
                            <Route exact path='/Iterations' component={Iterations} />
                            <Route exact path='/Teams' component={Teams} />
                    </Switch>
                    </div>
                    </Router>
                </div>
            </div>
        </div>


        );
      }
}

export default Menu;
