import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// set initial values of todo List for demonstration purposes
var todoItems = [];
todoItems.push({ index: 1, value: "Item 1", done: false });
todoItems.push({ index: 2, value: "Item 2", done: true });
todoItems.push({ index: 3, value: "Item 3", done: true });

// create Todolist component

class TodoList extends React.Component {
    render() {
        // map through items array recieved from component props and create TodoList Item
        // for each object in the array, 
        var items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            // return an unordered list component with the items as created by the map method
            <ul className="list-group"> {items} </ul>
        );
    }
}

// create TodoList item 
class TodoListItem extends React.Component {
   // constructor binds the event handling to the component
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    // event handling for the close button
    // removes the item from the screen and removes it from the array
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    // event handling for the done event, 
    // changes the display of the item to be crossed out and text color becomes red
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    // render the component
    render() {
        // ternary operator sets the done value of the done value in the variable to done or undone
        var todoClass = this.props.item.done ? "done" : "undone";

        // returns the TodoList Item Component used in the TodoList Component, 
       // 
        return (
            <li className="list-group-item ">
                <div className={todoClass}>
                    <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
                    {this.props.item.value}
                    <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

// TodoForm component
class TodoForm extends React.Component {

    // bind event handling
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

  // use the refs - we can update the single element without re-rendering the entire component
    componentDidMount() {
        this.refs.itemName.focus();
    }

    // event handling for the onsubmit button

    onSubmit(event) {
        // preventDefault prevents the form from reloading when the submit button is clicked
        event.preventDefault();
        // use refs to access the value of the text input element directly in the DOM 
        // using refs we can get access to the input text value and use the DOM  form Reset method to clear the user input
        // without needing to reload the entire form with blank inputs
        var newItemValue = this.refs.itemName.value;

        if (newItemValue) {
            this.props.addItem({ newItemValue });
            this.refs.form.reset();
        }
    }
    render() {
        return (
            // return a form component with refs to access DOM Form methods and provide easier access to th input fields values

            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..." />
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
}


// create a header component to be displayed
class TodoHeader extends React.Component {
    render() {
        return <div>
            <h1> To Do List with React </h1>
            <h3>Leon Stevens - WebDev - Level 2 - Task 10 </h3>

            </div>;
    }
}


// React Component to be exported to the index.js file to be rendered
class TodoApp extends React.Component {

    // constructor method - sets initial state and binds event handling

    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = { todoItems: todoItems };
    }

    // additem method adds the new item to the ToDo Items array using unShift, to add the item to the front of the array
    //sets the value of the Index and sets the done value to false 
    
    addItem(todoItem) {
        todoItems.unshift({
            index: todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });
        this.setState({ todoItems: todoItems });
    }

    // remove item uses the splice array method to remove the selected item from the TodoITems array
    // and updates the state with the new array
    removeItem(itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({ todoItems: todoItems });
    }

    // sets the done value of the selected item to the oposite of the current value
    // methid then uses splice to take the item out of the array and the rendered list
    // then uses a ternary operator to reinsert the item either to the front or back of the array
    // resulting in the specific item being rendered either on the top or bottom of the list 
    // depending on the boolean "done" value

    markTodoDone(itemIndex) {
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
        this.setState({ todoItems: todoItems });
    }

    // render the react components in a single Div to be rendered by the Index.js file 
    render() {
        return (
            <div id="main">
                <TodoHeader />
                <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
                <TodoForm addItem={this.addItem} />
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return <TodoApp initItems={todoItems} />;
    }
}

export default App;

// ReactDOM.render(<TodoApp initItems={todoItems} />, document.getElementById('app'));