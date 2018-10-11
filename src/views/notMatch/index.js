import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './index.less'

class NotMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='not-match'>
                <h1>404,没有找到你要的画面</h1>
                <p className='p'>来到这里,肯定是你人有问题,不然就是他人有问题。</p>
                <p className='pp'>(其实就是你人有问题)</p>
                <p className='ppp'>————沃兹基硕德</p>
                <div className='jump'>
                    <div>(如果要跳转到首页</div>
                    <Link to='/admin/home'>点我</Link>)
                </div>
            </div>
         )
    }
}
 
export default NotMatch;