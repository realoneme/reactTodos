import React, {Component} from 'react';
import ReactDom, {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import TodoApp from './components-todoapp/TodoApp';
render(<TodoApp/>,document.querySelector('#root'));