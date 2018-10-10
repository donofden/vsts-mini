import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home/Home';
import ReleasePlan from '../Components/ReleasePlan/ReleasePlan';
import TeamChart from '../Components/TeamChart/TeamChart'
import Iterations from '../Components/Iterations/Iterations';
import Teams from '../Components/Teams/Teams';
import Trello from '../Components/Trello/Trello';
import WorkItem from '../Components/WorkItem/WorkItem';
import BuildDefinition from './BuildDefinition/BuildDefinition';

class Main extends Component {
  render() {
    return (
      <main>
        		<div className="main">
              <div className="main-content">
                <div className="container-fluid">
                  <div className="panel panel-headline">
                    <div className="panel-body">
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/ReleasePlan' component={ReleasePlan} />
                      <Route exact path='/TeamChart' component={TeamChart} />
                      <Route exact path='/Iterations' component={Iterations} />
                      <Route exact path='/Teams' component={Teams} />
                      <Route exact path='/Trello' component={Trello} />
                      <Route exact path='/WorkItem/:id' component={WorkItem} />
                      <Route exact path='/BuildDefinition' component={BuildDefinition} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </main>
    );
  }
}

export default Main;
