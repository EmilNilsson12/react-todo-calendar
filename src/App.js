import { useEffect, useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';
import SwapView from './Components/SwapView/SwapView';
import GetAllTodos from './FetchRequests/GetAllTodos';

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
		addTodo: ({ inputTitle, inputDescription, inputDate }) => {
			console.log('Add todo');
			console.log('Add inputTitle: ', inputTitle);
			console.log('Add inputDescription: ', inputDescription);
			console.log('Add inputDate: ', inputDate);
		},
		deleteTodo: () => console.log('Delete todo'),
		updateTodo: () => console.log('Update todo'),
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
