import React, { Component, Suspense } from 'react';
import Link from 'umi/link';
import { Card, Table, DatePicker,InputNumber, Button,Tag, Popconfirm, message, Modal, Form, Row, Col, Input, Divider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, onChangeTime, onOkTime,record } = this.props;
      const { getFieldDecorator } = form;
      const { id,name,count,price,time,company } =record;
          var d = new Date(time);
    var dd = new Date(d); 
    var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return (
        <Modal
          visible={visible}
          title={id?'修改商品':'新增商品'}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          footer={[
            <Button key="back" onClick={onCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={onCreate}>
              {id?'保存':'创建'}
            </Button>,
          ]}
        >
          <Form layout="vertical">
          <Form.Item label="供货单位">
              {getFieldDecorator('company', {
                initialValue:company,
                rules: [{ required: true, message: '请输入!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="规格名称">
              {getFieldDecorator('name', {
                initialValue:name,
                rules: [{ required: true, message: '请输入!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="价格">
              {getFieldDecorator('price', {
                initialValue:price,
                rules: [{ required: true, message: '请输入!' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator('count', {
                initialValue:count,
                rules: [{ required: true, message: '请输入!' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="时间">
              {
                id && <div>{youWant}</div>
              }
              {getFieldDecorator('time', {
              })(
                <DatePicker 
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
@connect(({ quiz, loading }) => ({
  quiz,
  loading: loading.effects['quiz/fetch'],
}))
@Form.create()
class EntryText extends Component {
  state = {
    visible: false,
    priceTotal: '',
    countTotal: '',
    record:{}
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'quiz/fetch',
    }).then(() => {
      const {
        quiz: { data },
      } = this.props;
      let priceArr = [],
        countArr = [];
      data &&
        data.map(item => {
          priceArr.push(item);
          countArr.push(item.count);
        });
        let sum = 0;
        let priceTotal = priceArr.length>0 && priceArr.map(item=>{
          sum += item.price*item.count
        })
      let countTotal = countArr.reduce((current, price) => {
        return current + price;
      });
      this.setState({
        priceTotal:sum,
        countTotal,
      });
    });
  }
  showModal = (record) => {

    this.setState({ 
      visible: true,
      record,
      time:''
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { time ,record } = this.state;
      const { dispatch } = this.props;
      if(record.id){
        if(values.time){
          values.time = moment(values.time).format('YYYY-MM-DD')
          values.id = record.id;
        }else{
          var d = new Date(record.time);
          var dd = new Date(d); 
          var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          values.time = youWant
          values.id = record.id;
        }
     
      }else{
        values.time = values['time'].format('YYYY-MM-DD')
      }
      dispatch({
        type: 'quiz/create',
        payload: values,
      }).then(() => {
        dispatch({
          type: 'quiz/fetch',
        }).then(() => {
          const {
            quiz: { data },
          } = this.props;
          let priceArr = [],
            countArr = [];
          data &&
            data.map(item => {
              priceArr.push(item);
              countArr.push(item.count);
            });
            let sum = 0;
            let priceTotal = priceArr.length>0 && priceArr.map(item=>{
              sum += item.price*item.count
            })
          let countTotal = countArr.reduce((current, price) => {
            return current + price;
          });
          this.setState({
            priceTotal:sum,
            countTotal,
          });
        });
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      time:''
    });
    dispatch({
      type: 'quiz/fetch',
      payload: {},
    });
  };
    // 查询
    handleSearch = e => {
      e.preventDefault();
     
      const { dispatch, form } = this.props;
  
      form.validateFields((err, fieldsValue) => {
        if (err) return;
  
        const values = {
          ...fieldsValue,
        };
  
        this.setState({
          formValues: values,
        });
        
        values.time = this.state.time;
        dispatch({
          type: 'quiz/fetch',
          payload: values,
        });
      });
    };
  
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
            <FormItem label="供货单位">
              {getFieldDecorator('company')(
                <Input placeholder="请输入供货单位" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="规格名称">
              {getFieldDecorator('name')(
                <Input placeholder="请输入规格名称" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
          <Form.Item label="时间">
              {getFieldDecorator('time', {
              })(
                <DatePicker 
                 format={dateFormat}
                 onChange={this.onChangeTime}
                 onOk={this.onOkTime}
                  />
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
          <div style={{ overflow: 'hidden' }}>
            <span>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
            </div>
        </Col>
        </Row>
        
      </Form>
    );
  }

   confirm=(record) =>{
    let { id } = record;
    const { dispatch } = this.props;
    dispatch({
      type:'quiz/delete',
      payload:id
    }).then(()=>{
      dispatch({
        type: 'quiz/fetch',
      }).then(() => {
        const {
          quiz: { data },
        } = this.props;
        let priceArr = [],
          countArr = [];
        data &&
          data.map(item => {
            priceArr.push(item);
            countArr.push(item.count);
          });
          let sum = 0;
          let priceTotal = priceArr.length>0 && priceArr.map(item=>{
            sum += item.price*item.count
          })
        let countTotal = countArr.reduce((current, price) => {
          return current + price;
        });
        this.setState({
          priceTotal:sum,
          countTotal,
        });
      });
    })
  }
  
  
  render() {
    const {
      quiz: { data },
    } = this.props;
    const { record } = this.state;
    const columns = [
      {
        title: '供货单位',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: '规格名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '合计',
        dataIndex: 'sum',
        key: 'sum',
        render:(sum,record) => {
          return record.price * record.count
        }
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        render: time => {
          var d = new Date(time);
          var dd = new Date(d); 
          var youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          return youWant
        },
      },
      {
        title: '操作',
        dataIndex: 'op',
        key: 'op',
        render:(op,record)=>{
          return(
            <div>
              <a  onClick={this.showModal.bind(this,record)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定要删除这行数据吗?"
                onConfirm={this.confirm.bind(this,record)}
                onCancel={this.cancel}
                okText="是"
                cancelText="否"
              >
                <a>删除</a>
              </Popconfirm>
            </div>
          )
        }
      },
    ];
    return (
      <Card>
        <div style={{marginBottom:20}}>
        {this.renderSimpleForm()}
        </div>
        <Row gutter={24}>
          <Col md={17}>
            <Button type="primary" onClick={this.showModal}>
              新建
            </Button>
          </Col>
          <Col md={7} xl={7}>
            <span
              style={{
                display: 'inline-block',
                margin: '0 20px',
              }}
            >
              总价：<Tag color="red">{this.state.priceTotal}元</Tag>
            </span>
            <span>总数量：<Tag color="blue">{this.state.countTotal}件</Tag></span>
          </Col>
        </Row>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onOkTime={this.onOkTime}
          onChangeTime={this.onChangeTime}
          record={record}
        />
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    );
  }
}

export default EntryText;
