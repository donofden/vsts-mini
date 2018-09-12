import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home/Home';
import ReleasePlan from '../Components/ReleasePlan/ReleasePlan';
import TeamChart from '../Components/TeamChart/TeamChart'
import Iterations from '../Components/Iterations/Iterations';
import Teams from '../Components/Teams/Teams';
import Trello from '../Components/Trello/Trello';
import WorkItem from '../Components/WorkItem/WorkItem';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/ReleasePlan' component={ReleasePlan} />
          <Route exact path='/TeamChart' component={TeamChart} />
          <Route exact path='/Iterations' component={Iterations} />
          <Route exact path='/Teams' component={Teams} />
          <Route exact path='/Trello' component={Trello} />
          <Route exact path='/WorkItem' component={WorkItem} />
        </Switch>
    </main>
    );
  }
}

export default Main;
