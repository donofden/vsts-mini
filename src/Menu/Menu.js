import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
    render() {
        return (
          <menu>
            <div>
                <div>
                    <div className="nav__content">
                        <div>
                            <ul>
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/ReleasePlan'}>Release Plan</Link></li>
                                <li><Link to={'/TeamChart'}>Team Chart</Link></li>
                                <li><Link to={'/Iterations'}>Sprint Iterations</Link></li>
                                <li><Link to={'/Teams'}>Teams</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </menu>
        );
      }
}

export default Menu;
