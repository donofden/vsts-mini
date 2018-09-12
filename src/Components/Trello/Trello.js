import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import './Trello.css';

class Trello extends Component {
    render() {
      return (
          <div>
              <div class="ui">
                <nav class="navbar app">App bar</nav>
	            <nav class="navbar board">Board bar</nav>
                <div class="lists">
                    <div class="list">
                        <header>List header</header>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Header</header>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>
                                <img src="holder.js/300x150?auto=yes&bg=#ccc" alt=""></img>
                                Lorem ipsum dolor sit amet
                            </li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Another List</header>
                        <ul>
                            <li>Just some text</li>
                            <li>Just some text</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Header</header>
                        <ul>
                            <li>
                                <img src="holder.js/600x400?auto=yes&bg=#ccc" alt=""></img>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>
                                <img src="holder.js/150x150?auto=yes&bg=#ccc" alt=""></img>
                                Lorem ipsum dolor sit amet
                            </li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Another List</header>
                        <ul>
                            <li>Just some text</li>
                            <li>Yet another card</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Header</header>
                        <ul>
                            <li>
                                <img src="holder.js/150x150?auto=yes&bg=#ccc" alt=""></img>
                                Lorem ipsum dolor sit amet
                            </li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>
                                <img src="holder.js/600x400?auto=yes&bg=#ccc" alt=""></img>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet metus laoreet, ut condimentum</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                    <div class="list">
                        <header>Another List</header>
                        <ul>
                            <li>Just some text</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis enim sit amet</li>
                            <li>Some more text</li>
                            <li>Some more text</li>
                        </ul>
                        <footer>Add a card...</footer>
                    </div>
                </div>
            </div>
          </div>
      );
    }
}
export default Trello;
