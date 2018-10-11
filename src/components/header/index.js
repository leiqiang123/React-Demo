import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './index.less'
import {DateTime} from '../../utils'
import axios from 'axios'


class Header extends Component {

    state = {
        time:'2018-10-8 23:22:03',
        weather:'低温 3.0℃ ~ 高温 16.0℃ 西北风 4-5级'
    }
    getTime () {
        setInterval(() => {
            let timeStr = DateTime((new Date()).getTime())
            this.setState({
                time:timeStr
            })
        },1000)
    }
    getWeather () {
        axios.get('http://t.weather.sojson.com/api/weather/city/101010100').then(res => {
            let data = res.data.data.forecast[0]
            let weatherStr = `${data.low} ~ ${data.high} ${data.fx} ${data.fl}`
            this.setState({
                weather:weatherStr
            })
        })
    }
    componentWillMount () {
        this.getTime()
        this.getWeather()
    }
    render() { 
        return ( 
            <div className='header-wrap'>
                <div className='user-info'>
                    <div className='login'>
                        <Link to='/login'>退出</Link>
                    </div>
                    <div className='user-detail'>
                        欢迎，<span className='username'>无敌大大怪</span>
                    </div>
                </div>
                <div className='weather-wrap clearfix'>
                    <div className='breadcrumb fll'>
                        首页
                    </div>
                    <div className='weather flr clearfix'>
                        <div className='date fll'>
                            {this.state.time}
                        </div>
                        <div className='weather-detail fll'>
                            {this.state.weather}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Header;