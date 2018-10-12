import React, { Component } from 'react';
import { myConfig } from '../../config.js';

class Home extends Component {

    componentDidMount() {
      // To-Do for dynamic onmouse over the text for flip flop
    }
    render() {
      return (
        <div>
          <div class="container-home">
              <div class="row">
                  <div class="col-lg-4">
                      <div class="our-team-main">
                          <div class="team-front">
                              <img src="http://placehold.it/110x110/e91e63/fff?text=IS" class="img-fluid" />
                              <h3>Internal Systems</h3>
                              <p>Tooling POD</p>
                          </div>

                          <div class="team-back">
                              <span>
                              <table class="table table-bordered">
                                <thead>
                                    <tr><th>#</th><th>Columns</th><th>Items</th><th>Points</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>Sprint Backlog</td><td>1</td><td>30</td></tr>
                                    <tr><td>2</td><td>Doing</td><td>4</td><td>12</td></tr>
                                    <tr><td>3</td><td>Stuck</td><td>6</td><td>1</td></tr>
                                    <tr><td>4</td><td>Code Review</td><td>8</td><td>0</td></tr>
                                    <tr><td>5</td><td>Ready to Test</td><td>2</td><td>56</td></tr>
                                    <tr><td>6</td><td>Done</td><td>10</td><td>68</td></tr>
                                </tbody>
                            </table>
                            </span>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="our-team-main">

                          <div class="team-front">
                              <img src="http://placehold.it/110x110/336699/fff?text=AX" class="img-fluid" />
                              <h3>AX</h3>
                              <p>Tooling POD</p>
                          </div>

                          <div class="team-back">
                              <span>
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque penatibus et magnis dis parturient montes,
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque.
                              </span>
                          </div>

                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="our-team-main">
                          <div class="team-front">
                              <img src="http://placehold.it/110x110/607d8b/fff?text=CDB" class="img-fluid" />
                              <h3>CDB</h3>
                              <p>Tooling POD</p>
                          </div>
                          <div class="team-back">
                              <span>
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque penatibus et magnis dis parturient montes,
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque.
                              </span>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="our-team-main">
                          <div class="team-front">
                              <img src="http://placehold.it/110x110/4caf50/fff?text=PFS" class="img-fluid" />
                              <h3>PFS</h3>
                              <p>Tooling POD</p>
                          </div>
                          <div class="team-back">
                              <span>
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque penatibus et magnis dis parturient montes,
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque.
                              </span>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="our-team-main">
                          <div class="team-front">
                              <img src="http://placehold.it/110x110/9c27b0/fff?text=SDS" class="img-fluid" />
                              <h3>SDS</h3>
                              <p>Tooling POD</p>
                          </div>
                          <div class="team-back">
                              <span>
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque penatibus et magnis dis parturient montes,
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque.
                              </span>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4">
                      <div class="our-team-main">
                          <div class="team-front">
                              <img src="http://placehold.it/110x110/2196f3/fff?text=DM" class="img-fluid" />
                              <h3>Data Migration</h3>
                              <p>Tooling POD</p>
                          </div>
                          <div class="team-back">
                              <span>
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque penatibus et magnis dis parturient montes,
                              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                              natoque.
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
   }
}

export default Home;   
