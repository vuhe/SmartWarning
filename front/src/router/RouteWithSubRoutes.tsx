import React from 'react';
import { Route } from 'react-router-dom';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export default function RouteWithSubRoutes(route: SmartWarning.routeType) {
  // console.log('RouteWithSubRoutes: ' + route.path);
  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={(routeProps: any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...routeProps} routes={route.children} />
      )}
    />
  );
}
