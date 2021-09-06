import { useEffect, useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';
import SwapView from './Components/SwapView/SwapView';
import GetAllTodos from './FetchRequests/GetAllTodos';

// import {
// 	updateListOfTasks_DB,
// 	getListOfTasks_DB,
// } from './CrudFunctions/CrudFunctions.js';

function App() {
	const [showCalender, toggleShowCalender] = useState(false);

	// const [fetchingTodos, setFetchingTodos] = useState(true);
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const crudOperations = {
		addTodo: (todoObj) => {
			const copyOfTodos = [...todos];
			copyOfTodos.push(todoObj);
			setTodos(copyOfTodos);
		},
		deleteTodo: (id) => {
			console.log('Delete todo with id: ', id);
			// Make copy of todos

			// Filter out the deleted todo

			// Replace old todos with copy
		},
		updateTodo: (id) => {
			console.log('Update todo with id: ', id);
			// Make copy of todos

			// Filter out the updated todo

			// Add new version of updated todo to todos

			// Replace old todos with copy
		},
	};

	// const fetchAndSaveTodos = () => {
	// 	console.log('fetchAndSaveTodos is called!');
	// 	setTodos(
	// 		GetAllTodos((e) => {
	// 			console.log('todos parsed: ', e);
	// 			setTodos(e);
	// 			setFetchingTodos(false);
	// 		})
	// 	);
	// };

	// // componentDidMount
	// useEffect(() => {
	// 	console.log('App "componentDidMount"');
	// 	fetchAndSaveTodos();
	// }, []);

	const callBacks = {
		swapView: () => {
			toggleShowCalender(!showCalender);
		},
	};
	return (
		<div className='App'>
			<SwapView cbFunc={callBacks.swapView} />
			{showCalender ? (
				<CalenderView todos={todos} crudOperations={crudOperations} />
			) : (
				<ListTodosView todos={todos} crudOperations={crudOperations} />
			)}
		</div>
	);
}

export default App;
