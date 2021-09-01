import { useEffect, useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';
import SwapView from './Components/SwapView/SwapView';
import GetAllTodos from './FetchRequests/GetAllTodos';

function App() {
	const [showCalender, toggleShowCalender] = useState(false);

	const [fetchingTodos, setFetchingTodos] = useState(true);
	const [todos, setTodos] = useState();

	const fetchAndSaveTodos = () => {
		console.log('fetchAndSaveTodos is called!');
		setTodos(
			GetAllTodos((e) => {
				console.log('todos parsed: ', e);
				setTodos(e);
				setFetchingTodos(false);
			})
		);
	};

	// componentDidMount
	useEffect(() => {
		console.log('App "componentDidMount"');
		fetchAndSaveTodos();
	}, []);

	const callBacks = {
		swapView: () => {
			toggleShowCalender(!showCalender);
		},
	};
	return (
		<div className='App'>
      <SwapView cbFunc={callBacks.swapView} />
			{showCalender ? (
				<CalenderView />
			) : fetchingTodos ? (
				<div>Loading...</div>
			) : (
				<ListTodosView todos={todos} />
			)}
		</div>
	);
}

export default App;
