import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Card, Table, Upload,Icon,Button, Form, Input, Modal, Divider, Row, Col,message } from 'antd';
const FormItem = Form.Item;
interface IndexProps {
  dispatch: any;
  account: any;
  form: any;
  visible: boolean;
}

interface IndexState {
  visible: boolean;
  record: any;
  formValues: any;
}

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, record }: any = this.props;
      let { id, company, name, price, count } = record;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={id ? '编辑' : '新建'}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="company">
              {getFieldDecorator('company', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                initialValue: company
              })(<Input />)}
            </Form.Item>
            <Form.Item label="name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                initialValue: name
              })(<Input />)}
            </Form.Item>
            <Form.Item label="count">
              {getFieldDecorator('count', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                initialValue: count
              })(<Input />)}
            </Form.Item>
            <Form.Item label="price">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
                initialValue: price
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
@connect(({ account }: any) => ({
  account,
}))
@Form.create()
class Index extends PureComponent<IndexProps, IndexState> {
  state: IndexState = {
    visible: false,
    record: {},
    formValues: {}
  }
  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/getAccount',
      payload: {}
    })
  }
  showModal = (record: any) => {
    this.setState({ visible: true, record });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { record: { id } } = this.state;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      if (id) {
        values.id = id;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'account/addAccount',
        payload: values
      }).then(() => {
        this.fetch()
      })
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  del = (record: any) => {
    let id = record.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'account/delAccount',
      payload: {
        id
      }
    }).then(() => {
      this.fetch()
    })
  }
  handleSearch = (e: any) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err: any, fieldsValue: any) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'account/getAccount',
        payload: values
      });
    });
  }
  render() {
    const { account: { data }, form }: any = this.props;
    console.log('data',data)
    const { record } = this.state;
    let columns = [{
      dataIndex: 'company',
      title: 'company',
      key: 'company'
    }, {
      dataIndex: 'name',
      title: 'name',
      key: 'name'
    }, {
      dataIndex: 'price',
      title: 'price',
      key: 'price'
    }, {
      dataIndex: 'count',
      title: 'count',
      key: 'count'
    }, {
      dataIndex: 'operate',
      title: 'operate',
      key: 'operate',
      render: (operate: any, record: any) => {
        return (
          <div>
            <a onClick={this.del.bind(this, record)}>删除</a>
            <Divider type="vertical" />
            <a onClick={this.showModal.bind(this, record)}>编辑</a>
          </div>
        )
      }
    }]

    const props = {
      name: 'face',
      action: '/api/v1/uploadimg',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info:any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Card>
          <div>
            <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: '30px' }}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label="company">
                    {form.getFieldDecorator('company')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col md={7} sm={24}>
                  <FormItem label="name">
                    {form.getFieldDecorator('name')(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <span>
                    <Button type="primary" htmlType="submit">查询</Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>
          <Button type="primary" onClick={this.showModal}>
            增加
                </Button>
                <Upload {...props}>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            record={record}
          />
           <Table rowKey="id" columns={columns} dataSource={data&&data.data} />
        </Card>
      </div>
    )
  }
}

export default Index;