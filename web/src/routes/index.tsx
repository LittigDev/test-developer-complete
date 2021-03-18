import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Customers from '../pages/Customers';
import Customer from '../pages/Customer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Customers} />
    <Route path="/addcostumers" component={Customer} />
    <Route path="/customers/:id" component={Customer} />
  </Switch>
);

export default Routes;
