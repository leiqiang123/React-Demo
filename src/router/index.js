// import React from 'react';
import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from '../views/home'
import Admin from '../views/admin'
import NotMatch from '../views/notMatch'
import Order from '../views/order'
import Bar from '../views/echarts/bar'
import Pie from '../views/echarts/pie'
import OrderDetail from '../views/orderDetail'

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
                                <Route path='/admin/order' component={Order}></Route>
                                <Route path='/admin/bar' component={Bar}></Route>
                                <Route path='/admin/pie' component={Pie}></Route>
                                <Route component={NotMatch}></Route>
                            </Switch>
                        </Admin> 
                    }></Route>
                    <Route path='/common/order/detail/:id' component={OrderDetail}></Route>
                    <Route component={NotMatch}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
 
export default Router;