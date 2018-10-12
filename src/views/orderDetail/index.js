import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './index.less'

class orderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
componentWillMount () {
    console.log(this.props.match.params.id)
}

    render() { 
        return (  
            <div>
                <div className='header'>
                    <div className='header-title'>
                        <h2>共享单车后台系统</h2>
                    </div>
                    <div className='header-detail'>
                        <div className='user-detail'>
                            欢迎，<span className='username'>无敌大大怪</span>
                        </div>
                        <div>
                            <Link to='/login' className='login'>退出</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default orderDetail;