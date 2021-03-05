import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

const App = ({ routes }) => (
  <Router>{routes}</Router>
);

App.propTypes = {
  routes: PropTypes.object.isRequired,
};

export default App;
