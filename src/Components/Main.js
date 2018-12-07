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
import Groups from './Groups/Groups';
import VelocityMetrics from './VelocityMetrics/VelocityMetrics';

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
                      <Route exact path='/' component={Home} key="Home"/>
                      <Route exact path='/ReleasePlan' component={ReleasePlan} key="ReleasePlan" />
                      <Route exact path='/TeamChart' component={TeamChart} key="TeamChart" />
                      <Route exact path='/Iterations' component={Iterations} key="Iterations" />
                      <Route exact path='/Teams' component={Teams} key="Teams" />
                      <Route exact path='/Trello' component={Trello} key="Trello" />
                      <Route exact path='/WorkItem/:id' component={WorkItem} key="WorkItemId" />
                      <Route exact path='/BuildDefinition' component={BuildDefinition} key="BuildDefinition" />
                      <Route exact path='/Groups' component={Groups} key="Groups" />
                      <Route exact path='/VelocityMetrics' component={VelocityMetrics} key="VelocityMetrics"/>
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
