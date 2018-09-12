import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import './Home.css';

class Home extends Component {

    componentDidMount() {
      // To-Do for dynamic onmouse over the text for flip flop
    }
    render() {
      return (
        <div>
            <p className="title-txt">
              <span data-text="V">V</span>
              <span data-text="S">S</span>
              <span data-text="T">T</span>
              <span data-text="S">S</span>
              <span data-text="-">-</span>
              <span data-text="M">M</span>
              <span data-text="I">I</span>
              <span data-text="N">N</span>
              <span data-text="I">I</span>
            </p>
            <div id='c'>
              <div className='s'></div>
              <div className='s'></div>
              <div className='s'></div>
              <div className='s'></div>
              <div className='s'></div>
              <div className='s'></div>
            </div>
        </div>
      );
   }
}

export default Home;   
