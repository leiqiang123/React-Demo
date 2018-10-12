import React, { Component } from 'react';
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts' //引入echarts核心包
import 'echarts/lib/chart/pie'  //引入饼状图组件
import 'echarts/lib/component/legend'  //引入legend组件
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../../../theme/roma'


class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    getOptionOne = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: 'right',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name:'骑行订单',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1355, name:'周六'},
                        {value:1135, name:'周日'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

    getOptionTwo = () => {
        return {
            title : {
                text: '用户骑行订单',
                x:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name:'骑行订单',
                    type:'pie',
                    radius: ['50%', '70%'],
                    data:[
                        {value:335, name:'周一'},
                        {value:310, name:'周二'},
                        {value:234, name:'周三'},
                        {value:135, name:'周四'},
                        {value:1548, name:'周五'},
                        {value:1355, name:'周六'},
                        {value:1135, name:'周日'}
                    ],
                }
            ]
        }
    }

    componentWillMount () {
        echarts.registerTheme('roma', echartsTheme)
    }
    render() { 
        return ( 
            <div>
                <Card title='饼状图表一'>
                    <ReactEcharts option={this.getOptionOne()} theme='roma'></ReactEcharts>
                </Card>
                <Card title='饼状图表二'>
                    <ReactEcharts option={this.getOptionTwo()} theme='roma'></ReactEcharts>
                </Card>
            </div>
        )
    }
}
 
export default Pie;