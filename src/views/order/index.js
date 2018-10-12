import React, { Component } from 'react';
import { Form, Card, Select, DatePicker, Button, Table, message, Modal } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import './index.less'
import axios from '../../axios'

const Option = Select.Option;
const { RangePicker } = DatePicker;

class Order extends Component {

    state = {
        data:[],
        isLoading:false,
        selectedItem:{},
        // selectedKeys:[],
        visible:false,
        endOrderDetail:{}
    }

    pramas = {
        pn:1
    }

    //选择某一行表格时的事件
    rowSelection = {
        fixed:true,
        type:'radio',
        onChange:(selectedRowKeys, selectedRows) => {
            // console.log(selectedRowKeys, selectedRows)
            this.setState({
                // selectedKeys:selectedRowKeys,
                selectedItem:selectedRows[0]
            })
        }
    }
    //表格分页时的事件
    pagination = {
        total:100,
        pageSize:10,
        onChange:(index) => {
            this.pramas.pn = index
            this.getOrderData()
        }
    }

    city = [
        {
            label:'北京',
            value:0
        },
        {
            label:'上海',
            value:1
        },
        {
            label:'深圳',
            value:2
        },
        {
            label:'广州',
            value:3
        },
    ]

    orderState = [
        {
            label:'全部',
            value:0
        },
        {
            label:'进行中',
            value:1
        },
        {
            label:'结束行程',
            value:2
        },
    ]
    //查询信息按钮处理
    handleSearch = () => {
        console.log(this.props.form.getFieldsValue())
    }
    //重置查询信息
    handleReset = () => {
        this.props.form.resetFields()
    }

    //获取订单列表数据
    getOrderData = () => {
        this.setState({
            isLoading:true
        })
        axios.get('/order/list',this.pramas).then(res => {
            // console.log(res)
            this.setState({
                data:res.data.result.item_list.map((item,index) => {
                    item.key = index
                    return item
                }),
                isLoading:false
            })
        })
    }
    //结束订单(并弹出一个model框)
    endOrder = () => {
        let id = this.state.selectedItem.id
        if(id){
            axios.get('/order/ebike_info',{id}).then(res => {
                // console.log(res.data.result)
                this.setState({
                    visible:true,
                    endOrderDetail:res.data.result
                })
            })
        }else{
            message.info('请选择一项订单进行操作')
        }
        
    }
    //订单详情
    orderDetail = () => {
        let id = this.state.selectedItem.id
        if(id){
            window.open(`/#/common/order/detail/${id}`)
        }else{
            message.info('请选择一个订单')
        }
    }
    //取消model框
    cancelModal = () => {
        this.setState({
            visible:false
        })
    }
    //确认model框
    okModal = () => {
        let id = this.state.selectedItem.id
        axios.get('/order/finish_order',{id}).then(res => {
            if(res.data.code === '0'){
                this.setState({
                    visible:false
                })
                message.info('结束订单成功')
                this.getOrderData()
            }
        })
    }
    componentWillMount () {
        this.getOrderData()
    }

    render() { 

        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            },
        ]

        return ( 
            <div>
                <Card>
                    <Form layout='inline'>
                        <FormItem label='城市'>
                            {getFieldDecorator('city')(
                                <Select showSearch style={{ width: 180 }}
                                placeholder="请选择一个城市">
                                    {this.city.map((item,index) => 
                                        <Option value={item.value} key={index}>{item.label}</Option>
                                        )}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='订单时间'>
                            {getFieldDecorator('date')(
                                <RangePicker/>
                            )}
                        </FormItem>
                        <FormItem label='订单状态'>
                            {getFieldDecorator('orderState')(
                                <Select showSearch style={{ width: 180 }}
                                placeholder="请选择一个状态">
                                    {this.orderState.map((item,index) => 
                                        <Option value={item.value} key={index}>{item.label}</Option>
                                        )}
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                    <div className='btn-select'>
                        <Button type='primary' onClick={this.handleSearch}>查询</Button>
                        <Button type='danger' onClick={this.handleReset}>重置</Button>
                    </div>
                </Card>
                <Card style={{margin:"-1px 0"}}>
                    <div className='btn-order'>
                        <Button type='primary' onClick={this.orderDetail}>订单详情</Button>
                        <Button type='primary' onClick={this.endOrder}>结束订单</Button>
                    </div>
                </Card>
                <Card>
                    <Table 
                        bordered={true} 
                        loading={this.state.isLoading} 
                        columns={columns} 
                        dataSource={this.state.data}
                        rowSelection={this.rowSelection}
                        pagination={this.pagination}>
                    </Table>
                </Card>
                <Modal 
                    title="结束订单"
                    visible={this.state.visible}
                    onOk={this.okModal}
                    onCancel={this.cancelModal}
                    okText="确认"
                    cancelText="取消">
                    <ul className='model-ul'>
                        <li>车辆编号:{this.state.endOrderDetail.bike_sn}</li>
                        <li>剩余电量:{this.state.endOrderDetail.battery}</li>
                        <li>行程开始时间:{this.state.endOrderDetail.start_time}</li>
                        <li>当前位置:{this.state.endOrderDetail.location}</li>
                    </ul>
                </Modal>
            </div>
        )
    }
}


export default Form.create()(Order)