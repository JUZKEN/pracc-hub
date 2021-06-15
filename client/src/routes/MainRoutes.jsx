import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Scrims from '../views/Scrims/Scrims';
import Hubs from '../views/Hubs/Hubs';

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