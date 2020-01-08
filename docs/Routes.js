import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdvancedNavPage from './pages/AdvancedNavPage';
import ComponentsNavPage from './pages/ComponentsNavPage';



class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/components' component={ComponentsNavPage} />
        <Route exact path='/components/:hash' component={AdvancedNavPage} />
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }} 
        />
      </Switch>
    );
  }
}

export default Routes;
