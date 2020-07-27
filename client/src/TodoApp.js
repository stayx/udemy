import React, { Component } from 'react'

const NavBar = () => {
    return (<nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">The React Todo List</span>
    </nav>)
}

const List = ({ todos, markDone}) => {
    return todos.map(todo => {
        return <Todo todo={todo} markDone={markDone}/>
    })
}

const Todo = ({ todo, markDone }) => {
    return (
        <ul class="no-padding">
            <li class="list-unstyled">
                <label onClick={() => markDone(todo)}>{todo}</label>
            </li>
            <hr />
        </ul>
    )
}

const Done = ({list, markUndone, delet}) => {
    return list.map(done => {
        return (
            <ul id="done-items" class="list-unstyled">
                <li class="list-unstyled done" >
                    <label onClick={() => markUndone(done)}>{done}</label>
                    <button  className="btn float-right paddingZero" onClick={() => delet(done)}><i aria-hidden="true" class="fa fa-trash red"></i></button>
                </li>
            </ul>
        )
    }) 
}

export default class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: ['Take out the trash', 'rdv Dentist'],
            done: [], 
            input: ''
        }
    }

    add = (e) => {
        if (e.key === 'Enter') {
            this.state.todos.unshift(this.state.input)
            this.setState({todos: this.state.todos})
            e.target.value = ''
        } 
    }

    onChange = (input) => {
        this.setState({input: input})
    }

    markDone = (todo) => {
        let list = this.state.todos.filter(t => {
            return t != todo
        })
        this.state.done.push(todo)
        this.setState({done: this.state.done, todos: list})
    }

    markUndone = (todo) => {
        let list = this.state.done.filter(t => {
            return t != todo
        })
        this.state.todos.push(todo)
        this.setState({done: list, todos: this.state.todos})
    }

    delete = (done) => {
        let list = this.state.done.filter(t => {
            return t != done
        })
        this.setState({done: list})
    }

    render() {
        return (
            <div>
                <NavBar />
                <div class="container">
                    <br />
                    <div class="row">

                        <div class="col-md-6">
                            <div class="todolist not-done">
                                <input type="text" class="form-control add-todo btn-lg" placeholder="Add todo" 
                                onChange={(e) => this.onChange(e.target.value)}
                                onKeyDown={(e) => this.add(e, this.state.input)}/>
                                <br />
                                <List todos={this.state.todos} markDone={this.markDone}/>
                                <div class="todo-footer">
                                    <strong><span class="count-todos">{this.state.todos.length}</span></strong> Items Left
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="todolist">
                                <h3>Done</h3>
                                <Done list={this.state.done} markUndone={this.markUndone} delet={this.delete}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}