import React,{Component} from 'react';

export default class TodoHeader extends Component{
    addTodo=(ev)=>{
        let code = ev.keyCode;
        if(code ===13){
            let content = ev.target.value;
            if(content){
                this.props.addTodo({content});
                ev.target.value=''
            }
        }
    };

    render(){
        return(
            <input type="text" className="form-control" placeholder="要做什么赶快记下来要不然以你的智商就忘了" onKeyDown={this.addTodo}/>
        )
    }
}