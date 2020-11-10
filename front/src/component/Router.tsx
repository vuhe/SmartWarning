import React, { memo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';
import A from '@/page/A';
import B from '@/page/B';

const Router = memo(function Router() {
    return (
        <Switch>
            <Route exact path="/">
                Home
            </Route>
            <Route path="/a" component={A} />
            <Route path="/b" component={B} />
        </Switch>
    );
});

export default hot(Router);
