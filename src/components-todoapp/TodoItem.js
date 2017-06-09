import React, {Component} from 'react';

export default class TodoItem extends Component {
    handleKeyDown = (event, id) => {
        let code = event.keyCode;
        if (code === 13) {
            let content = event.target.value;
            this.props.updateTodo(id, content);
        }
        if(code === 27){
            this.props.cancelEdit();
        }
    };

    render() {
        let {todo, editing} = this.props;
        return (
            <li className="list-group-item" onDoubleClick={() => this.props.changeEditing(todo.id)}>
                <input type="checkbox" checked={todo.completed} onChange={() => this.props.toggle(todo.id)}/>
                {
                    editing === todo.id ?
                        <input onKeyDown={(event) => this.handleKeyDown(event, todo.id)}
                               style={{marginLeft: 10, width: '80%', display: 'inline-block'}} className="form-control"
                               defaultValue={todo.content}/> : <span style={{
                        paddingLeft: '10px',
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#aaa' : '#000'
                    }}>{todo.content}</span>

                }

                <button className="btn btn-danger btn-xs pull-right" type="button"
                        onClick={() => this.props.delTodo(todo.id)}>x
                </button>
            </li>
        )
    }
}