import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: '/fpsak/',
});

const withRouterProvider = (Story: any) => (
  <Router history={history}>
    <Story />
  </Router>
);

export default withRouterProvider;
