import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import map from 'lodash/map';
import CoreLayout from '../layouts/CoreLayout';
import routes from './routes';

function App() {
  return (
    <CoreLayout>
      <Switch>
        {
        map(
          routes,
          ({ path, component }) => (
            <Route exact={path === '/'} key={`route-${path}`} path={path} component={component} />
          ),
        )
      }
      </Switch>
    </CoreLayout>
  );
}


export default App;
