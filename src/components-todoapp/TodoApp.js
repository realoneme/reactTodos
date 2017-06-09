/**
 * Created by rebec on 2017/6/8.
 */
import React, {Component} from 'react';
import TodoHeader from './TodoHeader';
import Todolist from './Todolist';
import TodoController from './TodoController';
import TodoTitle from './TodoTitle'
import * as filterTypes from './filter-types';//*代表一个对象 表示filterTypes

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: null,//编辑中的todo的主键
            todos: [],
            //todo的对象数组{id,content,completed}
            filters: filterTypes.SHOW_ALL//定义新的过滤条件
        }
    }
    // 初始化list方法
    initTodos =()=>{
        let todos= this.state.todos;
       for(let i=0;i<localStorage.length;i++){
           let key = localStorage.key(i);
           let content = localStorage.getItem(key);
           let todo={};
           todo.id=key;
           todo.content = content;
           todos.push(todo);

       }
        this.setState({
            todos
        })

    };
    //增加一条todoItem
    addTodo = (todo) => {
        todo.id = new Date() + '' + Math.random();
        todo.completed = false;
        this.state.todos.push(todo);
        this.setState({todos: this.state.todos});
        this.storeData(todo);
    };
    // 删除一条todoItem
    delTodo = (deleteId) => {
        let todos = this.state.todos.filter(todo => {
            this.removeData(deleteId);
          return  todo.id !== deleteId
        });
        this.setState({todos});

    };
    //删除全部todoItem
    delCompleted = () => {
        let deltodos = this.state.todos.filter(todo=>todo.completed);
        let delIds =[];
        for(let i =0;i<deltodos.length;i++){
            delIds.push(deltodos[i].id);
        }
        let todos = this.state.todos.filter(todo => !todo.completed);
        this.setState({todos});
        this.removeData(delIds);
    };
    //改变完成或者未完成状态
    toggle = (id) => {
        let todos = this.state.todos.map(item => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        });
        this.setState({todos})
    };
    //全选
    toggleAll = (check) => {
        let todos = this.state.todos.map(todo => {
            todo.completed = check;
            return todo;
        });
        this.setState({todos})
    };
    //切换完成状态
    changeFilters = (filters) => {
        this.setState({filters})
    };
    //改变当前todo列表是否有需要编辑的item，根据传入的id值找到哪个item处于编辑状态，并且需要接收到编辑过的值
    changeEdting = (editing) => {
        this.setState({
            editing
        })
    };
    //接收到编辑过的值，并存储到state里，同步到localstorage里
    updateTodo = (id, content) => {
        let todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.content = content;
                this.storeData(todo);
            }
            return todo;
        });
        this.setState({todos,editing:null});

    };
    //取消编辑
    cancelEdit =()=>{
        this.setState({editing:null});
    };
    //存储到localstorage
    storeData = (data)=>{
        let {id,content} = data;
        localStorage.setItem(id,content);
    };
    //从localstorage里删除一项或多项
    removeData =(data)=>{
        if(data instanceof Array){
            for(let i =0;i<data.length;i++){
                localStorage.removeItem(data[i]);
            }
        }else{
            localStorage.removeItem(data)
        }
    };
    //页面加载完成调用初始化initTodos方法来初始化todolist的值
    componentDidMount(){
        this.initTodos();
    }
    render() {
        let showTodos = this.state.todos.filter(todo => {
            switch (this.state.filters) {
                case filterTypes.SHOW_ACTIVE:
                    return !todo.completed;
                case filterTypes.SHOW_COMPLETED:
                    return todo.completed;
                default:
                    return true;
            }
        });
        //未完成的待办事项数量
        let activeCount = this.state.todos.filter(item => !item.completed).length;
        let footerOptions = {
            filter: this.state.filters,
            activeCount,
            delCompleted: this.delCompleted,
            changeFilters: this.changeFilters
        };
        let bodyOptions = {
            todos: showTodos,
            delTodo: this.delTodo,
            toggle: this.toggle,
            activeCount,
            toggleAll: this.toggleAll,
            editing: this.state.editing,
            changeEditing: this.changeEdting,
            updateTodo:this.updateTodo,
            cancelEdit:this.cancelEdit
        };
        return (
            <div>
                <TodoTitle/>
                <div className="container" style={{marginTop: '20px'}}>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <TodoHeader addTodo={this.addTodo}/>
                                </div>
                                <div className="panel-body">
                                    <Todolist {...bodyOptions}/>
                                </div>
                                <div className="panel-footer">
                                    <TodoController {...footerOptions}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}