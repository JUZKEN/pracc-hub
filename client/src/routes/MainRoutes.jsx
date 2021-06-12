import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Scrims from '../components/Scrims/Scrims';
import Hubs from '../components/Hubs/Hubs';

function MainRoutes() {
   return (
      <Switch>
         <Route path="/scrims" component={Scrims} />
         <Route path="/hubs" component={Hubs} />
         <Redirect to="/scrims" />
      </Switch>
   );
}

export default MainRoutes;