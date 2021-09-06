import { useEffect, useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';
import SwapView from './Components/SwapView/SwapView';

function App() {
	const [showCalender, toggleShowCalender] = useState(false);

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
			const copyOfTodos = [...todos].filter((todo) => todo.id !== id);

			// Replace old todos with copy
			setTodos(copyOfTodos);
		},
		updateTodo: (updatedTodoObj) => {
			console.log('Update todo with id: ', updatedTodoObj.id);

			// Find relevant entry
			const todoToBeUpdated = todos.find(
				(todo) => todo.id === updatedTodoObj.id
			);
			console.log('todoToBeUpdated: ', todoToBeUpdated);
			console.log('updatedTodoObj: ', updatedTodoObj);

			// Make copy of todos
			// Filter out the updated todo
			const copyOfTodos = [...todos].filter(
				(todo) => todo.id !== updatedTodoObj.id
			);

			// Add new version of updated todo to todos
			copyOfTodos.push(updatedTodoObj);
			// Replace old todos with copy
			setTodos(copyOfTodos);
		},
	};

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
