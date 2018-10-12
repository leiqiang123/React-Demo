import React, { Component } from 'react';
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts' //引入echarts核心包
import 'echarts/lib/chart/pie'  //引入饼状图组件
import 'echarts/lib/component/legend'  //引入legend组件
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../../../theme/roma'

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    getOptionOne = () => {
        return{
            title : {
                text:'OFO周订单'
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'ofo订单量',
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }
    
    getOptionTwo = () => {
        return {
            title : {
                text:'用户骑行订单'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['OFO','摩拜','小蓝单车']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'OFO',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'小蓝单车',
                    type:'bar',
                    data:[220, 182, 191, 234, 290, 330, 310]
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
                <Card title='柱形图表一'>
                    <ReactEcharts option={this.getOptionOne()} theme='roma'></ReactEcharts>
                </Card>
                <Card title='柱形图表二'>
                    <ReactEcharts option={this.getOptionTwo()} theme='roma'></ReactEcharts>
                </Card>
            </div>
        )
    }
}
 
export default Bar;