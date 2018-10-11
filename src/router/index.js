// import React from 'react';
import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import Admin from '../views/admin'
import NotMatch from '../views/notMatch'
import SecondPage from '../views/secondPage'

class Router extends Component {
    state = {  }
    render() { 
        return (
            <HashRouter>
                <Switch>
                    <Route path='/admin' render={() =>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/secondPage' component={SecondPage}></Route>
                                <Route component={NotMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route component={NotMatch}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
 
export default Router;