import React, {Component} from 'react';
import TodoItem from './TodoItem';
export default class Todolist extends Component {
    render() {
        let {todos, activeCount, editing, changeEditing,delTodo,toggle,updateTodo,cancelEdit} = this.props;
        return (

            <ul className="list-group">
                {
                    todos.length > 0 ? (<li className="list-group-item">
                        <input type="checkbox" checked={activeCount === 0}
                               onChange={(event) => this.props.toggleAll(event.target.checked)}/>
                        <span style={{marginLeft: '5px'}}>{activeCount === 0 ? '全部取消' : '全部选中'}</span></li>) : null
                }
                {
                    todos.map((todo, index) => <TodoItem editing={editing}
                                                         key={index}
                                                         todo={todo}
                                                         delTodo={delTodo}
                                                         toggle={toggle}
                                                         changeEditing={changeEditing}
                                                         updateTodo={updateTodo}
                                                         cancelEdit={cancelEdit}/>)
                }
            </ul>
        )
    }
}