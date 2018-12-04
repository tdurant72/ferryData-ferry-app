import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from '../App'
import Ferry from './Ferry'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/ferry/:id" component={Ferry} />
            </Switch>

        </BrowserRouter>

    );
}

export default Router;