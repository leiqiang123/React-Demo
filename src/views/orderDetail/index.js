import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import './index.less'
import axios from '../../axios'

class orderDetail extends Component {

    state = {
        detail:{}
    }

    getMapData = () => {
        let id = this.props.match.params.id
        axios.get('/order/detail',{id}).then(res => {
            console.log(res)
            this.setState({
                detail:res.data.result
            })
            this.init(res.data.result)
        })
    }
    
    //初始化一个百度地图实例
    init = (result) => {
        const BMap = window.BMap
        this.map = new BMap.Map("b-map"); 
        // var point = new BMap.Point(116.404, 39.915); 
        // map.centerAndZoom(point, 15);  
        // map.enableScrollWheelZoom(true);
        this.addController()
        this.drawPolyline(result.position_list)
        this.drawService(result.area)
    }

    //添加控件
    addController = () => {
        const BMap = window.BMap
        const map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        }));    
        map.addControl(new BMap.ScaleControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        })); 
    }

    //绘制折线图
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map
        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length - 1]
        var startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat);  //创建中心点
        var endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat);  //创建中心点

        let startIcon = new BMap.Icon('/imgs/start_point.png', new BMap.Size(36, 42), {    
            imageSize:  new BMap.Size(36, 42)
        });
        let endIcon = new BMap.Icon('/imgs/end_point.png', new BMap.Size(36, 42), {    
            imageSize:  new BMap.Size(36, 42)
        });
        //绘制折线
        var polyline = new BMap.Polyline(
            position_list.map(item => {
                return new BMap.Point(item.lon, item.lat)
            }),
            {strokeColor:"red", strokeWeight:4, strokeOpacity:0.5}
            );
        map.addOverlay(polyline);

        var startMarker = new BMap.Marker(startBmapPoint, {icon: startIcon});        // 创建起点标注    
        var endMarker = new BMap.Marker(endBmapPoint, {icon: endIcon});        // 创建终点标注  
        map.centerAndZoom(startBmapPoint, 12);   //设置地图中心点
        map.addOverlay(startMarker);   //绘制起点
        map.addOverlay(endMarker);     //绘制终点
    }

    //绘制服务区
    drawService = (area) => {
        const BMap = window.BMap
        const map = this.map

        let polygon = new BMap.Polygon(area.map(item => {
            return new BMap.Point(item.lon, item.lat)
        }), {
            strokeColor:'red',
            strokeWeight:2,
            strokeOpacity:0.5,
            fillColor:'#409eff',
            fillOpacity:0.1
        })

        map.addOverlay(polygon)
    }


    componentDidMount () {
        this.getMapData()
    }

    // componentWillMount () {
    //     console.log(this.props.match.params.id)
    // }

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
                <Card>
                <div id="b-map" className='b-map'></div> 
                </Card>
                <div className='detail-info'>
                    <div className='item-title'>基础信息</div>
                    <ul>
                        <li>
                            <span className='info-left'>用车模式</span>
                            <span className='info-right'>共享车</span>
                        </li>
                        <li>
                            <span className='info-left'>订单编号</span>
                            <span className='info-right'>{this.state.detail.order_sn}</span>
                        </li>
                        <li>
                            <span className='info-left'>车辆编号</span>
                            <span className='info-right'>{this.state.detail.bike_sn}</span>
                        </li>
                        <li>
                            <span className='info-left'>用户姓名</span>
                            <span className='info-right'>{this.state.detail.user_name}</span>
                        </li>
                        <li>
                            <span className='info-left'>手机号码</span>
                            <span className='info-right'>{this.state.detail.mobile}</span>
                        </li>
                    </ul>
                </div>
                <div className='detail-info'>
                    <div className='item-title'>行驶轨迹</div>
                    <ul>
                        <li>
                            <span className='info-left'>行程起点</span>
                            <span className='info-right'>{this.state.detail.start_location}</span>
                        </li>
                        <li>
                            <span className='info-left'>行程终点</span>
                            <span className='info-right'>{this.state.detail.end_location}</span>
                        </li>
                        <li>
                            <span className='info-left'>行驶里程</span>
                            <span className='info-right'>{this.state.detail.distance/1000}KM</span>
                        </li>
                    </ul>
                </div>
                <div className='space-content'></div>
            </div>
        )
    }
}
 
export default orderDetail;