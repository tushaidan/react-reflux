import Reflux from 'reflux'
import React from 'react'
import TodoStore from '../../stores/TodoStores'
import TodoActions from '../../actions/TodoActions'
import {Form,Row, Col,Input,Button} from 'antd'
const FormItem = Form.Item;

var TodoComponent = React.createClass({
    mixins: [Reflux.ListenerMixin],//下面需要指定我要监听执行的回调函数是哪一个 或者采用 //Reflux.listenTo(TodoStore, 'onlistChange')下面不需要指定

    getInitialState() {
        return {list: []};
    },

    componentDidMount() {
        this.unsubscribe = TodoStore.listen(this.onlistChange);
        TodoActions.getAll();
    },

    componentWillUnmount() {
        console.log(5);
        this.unsubscribe();
    },

    onlistChange() {
      console.log(2);
      this.setState({list: TodoStore.items});
    },

    handleAdd(model){
        model = {'name':$('#itemName').val()}
        TodoActions.addItem(model);
    },

    render() {
        return (
            <div>
            <Row>
                <Form inline onSubmit={this.handleAdd   }>
                  <FormItem>
                      <Col span="6">
                        <Input id="itemName" placeholder="请输入..." />
                      </Col>
                  </FormItem>
                  <FormItem>
                    <Button htmlType="submit" >添加</Button>
                  </FormItem>
                </Form>
            </Row>
                {this.state.list.map(function (item,index) {
                    return <TodoItem data={item} key={index} />
                })}
            </div>
        )
    }
});

//组件随时都可以绑定需要的数据，一个store可以对应多个Store
var TodoItem = React.createClass({
    mixins: [Reflux.listenTo(TodoStore, 'onChange')],

    componentDidMount() {
        //TodoActions.getAll();
    },

    onChange() {
        console.log(7);
    },

    handleAdd(model) {
        model = {'name':Math.round(Math.random()*1000)}
        TodoActions.addItem(model);
    },

    handleDelete(model,index) {
        TodoActions.deleteItem(model,index);
    },

    handleUpdata(model,index) {
        TodoActions.updata(model,index);
    },

    render() {
        return (
            <div>
                <p>{this.props.data.name} <Button onClick={this.handleDelete}>x</Button> <Button onClick={this.handleAdd}>+</Button> 
                &nbsp;<Button onClick={this.handleUpdata}>⬆️</Button> </p>
            </div>
        )
    }
});

export default TodoComponent;