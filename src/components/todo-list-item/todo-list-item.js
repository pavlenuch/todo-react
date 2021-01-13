import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
    // state = {
    //     done: false,
    //     important: false
    // };
    // onLabelClick = () => {
    //     this.setState( ({done}) => {
    //         return {
    //             done: !done
    //         }
    //     });
    // }
    // onMarkImportant = () => {
    //     this.setState( ({important})=>{
    //         return {
    //             important: !important
    //         }
    //     });
    // }

    render(){
        const { label, onDeleted, onToggleImportant, onToggleDone, 
            done, important
        } = this.props;
        // const { done, important } = this.state;

        let classNames = "todo-list-item-label";
        if(done) {
            classNames += ' done';
        }
        if (important) {
            classNames += ' important';
        }
        
        return (
            <span className='todo-list-item'>
                <span className={classNames} onClick={onToggleDone}>{label}</span>
        
                <button type="button" className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>
        
                <button type="button" className="btn btn-outline-danger btn-sm float-right"
                onClick={ onDeleted }>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        )
    }
};