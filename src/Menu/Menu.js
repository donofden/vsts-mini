import React, { Component } from 'react';
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
                    <ul className="nav__list">
                        <li className="nav__list-item">Dashboard</li>
                        <li className="nav__list-item">Delivery Plan</li>
                        <li className="nav__list-item">Iteration</li>
                        <li className="nav__list-item">Contact</li>
                    </ul>
                </div>
            </div>
        </div>
        );
      }
}

export default Menu;