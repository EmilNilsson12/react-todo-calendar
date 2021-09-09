import { useEffect, useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';

function App() {
	// Todos is parsed from localStorage
	// or declared as an empty array
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const crudOperations = {
		addTodo: (todoObj) => {
			// Make copy of todos array
			const copyOfTodos = [...todos];

			customHookSetTodos(copyOfTodos, setTodos, todoObj);
		},
		deleteTodo: (id) => {
			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter((todo) => todo.id !== id);

			// Replace todos with copyOfTodos
			customHookSetTodos(copyOfTodos, setTodos);
		},
		toggleCompleteTodo: ({ id }) => {
			// Find relevant entry from saved todos
			const todoToBeUpdated = todos.find((todo) => todo.id === id);

			// Update completed-property to opposite of its inital value
			todoToBeUpdated.completed = !todoToBeUpdated.completed;

			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter((todo) => todo.id !== id);

			customHookSetTodos(copyOfTodos, setTodos, todoToBeUpdated);
		},
		updateTodo: (updatedTodoObj) => {
			// Make copy of todos array
			// and filter out the deleted todo
			const copyOfTodos = [...todos].filter(
				(todo) => todo.id !== updatedTodoObj.id
			);

			customHookSetTodos(copyOfTodos, setTodos, updatedTodoObj);
		},
	};

	return (
		<div className='App'>
			<ListTodosView todos={todos} crudOperations={crudOperations} />
			<CalenderView todos={todos} crudOperations={crudOperations} />
		</div>
	);
}

export default App;

function customHookSetTodos(array, hookCallback, object) {
	// Add new version of object to array
	// unless object is missing
	console.log('Object: ', object);
	if (object) array.push(object);

	// Replace todos with copyOfTodos
	hookCallback(array);
}
