import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Menu, } from 'antd';
import './index.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../../redux/actions'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item


class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    clickMenuItem = ({item}) => {
        let text = item.props.children.props.children
        this.props.action.changeMenuItem(text)
    }
    render() { 
        return ( 
            <div className='nav-left'>
                <Menu mode='vertical' theme='dark' onClick={this.clickMenuItem}>
                    <MenuItem key='/首页'>
                        <Link to='/admin/home'>首页</Link>
                    </MenuItem>
                    <SubMenu key="sub1" title={<span>订单管理</span>}>
                        <MenuItem key='/订单管理页'>
                            <Link to='/admin/order'>订单管理</Link>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span>图例</span>}>
                        <MenuItem key='/条形图页'>
                            <Link to='/admin/bar'>条形图</Link>
                        </MenuItem>
                        <MenuItem key='/饼状图页'>
                            <Link to='/admin/pie'>饼状图</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
 
export default connect(null,(dispatch) => ({
    action: bindActionCreators(actions, dispatch)
}))(NavLeft);