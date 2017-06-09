import React, {Component} from 'react';
import * as filterTypes from './filter-types';//*代表一个对象 表示filterTypes

export default class TodoController extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3 text-center" style={{lineHeight: '37px'}}>
                    <span>骚年还有{this.props.activeCount}件事儿没做</span>
                </div>
                <div className="col-md-6 text-center">
                    <button
                        className={"btn btn-default " + (this.props.filter === filterTypes.SHOW_ALL ? 'active' : '')}
                        style={{marginLeft: '5px'}} onClick={() => this.props.changeFilters(filterTypes.SHOW_ALL)}>全部
                    </button>
                    <button
                        className={"btn btn-default " + (this.props.filter === filterTypes.SHOW_ACTIVE ? 'active' : '')}
                        style={{marginLeft: '5px'}} onClick={() => this.props.changeFilters(filterTypes.SHOW_ACTIVE)}>
                        未完成
                    </button>
                    <button
                        className={"btn btn-default " + (this.props.filter === filterTypes.SHOW_COMPLETED ? 'active' : '')}
                        style={{marginLeft: '5px'}}
                        onClick={() => this.props.changeFilters(filterTypes.SHOW_COMPLETED)}>已完成
                    </button>
                </div>
                <div className="col-md-3 text-center">
                    <button className="btn btn-danger" onClick={this.props.delCompleted}>清除已完成</button>
                </div>
            </div>
        )
    }
}