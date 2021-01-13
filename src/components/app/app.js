import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import './app.css';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item/add-item';

export default class App extends Component {
    
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
        filter: 'all'
    };
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            display: true,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(( { todoData } )=>{
            const idx = todoData.findIndex( (el) => el.id === id );
            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newArray
            }
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(( { todoData } )=>{
            const newArr = [...todoData, newItem];

            return {
                todoData: newArr
            }
        })
    }


    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex( (el) => el.id === id );
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    getElementForSort = (item, bool) => {
        return {
            label: item.label,
            important: item.important,
            done: item.done,
            display: bool,
            id: item.id
        }
    };
    getSortElements = (arr, bool, boolIf, boolElse ) => {
        return arr.map((item) => {
            if(item.done === bool){
                return this.getElementForSort(item, boolIf)
            } else {
                return this.getElementForSort(item, boolElse)
            }
        });
    }
    sortDone = () => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.getSortElements(todoData, true, true, false)
            }
        });
    }
    sortActive = () => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.getSortElements(todoData, false, true, false)
            }
        });
    };
    sortAll = () => {
        this.setState(({ todoData }) => {
            let arrDone = todoData.map((item) => {
                return this.getElementForSort(item, true)
            });
            return {
                todoData: arrDone
            }
        });
    };
 
    // моя функция поиска
    search = (items, term) => {
        if(term.length === 0) { return items; }

        return items.filter((item)=>{
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    };
    onSearchChange = (term) => {
        this.setState({ term });
    };
    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filter = (items, filter) => {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done)
            case 'done':
                return items.filter((item) => item.done)
            default:
                return items;
        }
    }

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData
                            .filter((el)=>el.done).length;
        const todoCount = todoData.length - doneCount;
    
        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel todos={todoData} searchItem={this.searchItem} onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={filter} 
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems} onDeleted={ this.deleteItem }
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />
                <AddItem onItemAdded={ this.addItem }/>
            </div>
        );
    }
};