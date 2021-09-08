import { useState } from 'react';
import moment from 'moment';

import './ListTodosView.css';

import TodoForm from '../TodoForm/TodoForm';
import TodoView from '../TodoView/TodoView';

function ListTodosView({ todos, crudOperations, insideDayWithTodos }) {
	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
	const [updateParams, setUpdateParams] = useState({});

	const [showIncompleteOnly, toggleShowIncompleteOnly] = useState(false);

	const handleTodoUpdate = (todoObj) => {
		setCurrentlyUpdating(true);
		setUpdateParams(todoObj);
	};

	let sortedByDueDate = [...todos.sort(compareByDates)];
	if (showIncompleteOnly)
		sortedByDueDate = [...sortedByDueDate.filter((todo) => !todo.completed)];
	console.log(sortedByDueDate);
	return currentlyUpdating ? (
		<TodoForm
			addTodo={crudOperations.addTodo}
			updateTodo={crudOperations.updateTodo}
			defaultDate={moment(updateParams.deadline)}
			updateParams={updateParams}
			updateMode={true}
			setCurrentlyUpdating={setCurrentlyUpdating}
		/>
	) : (
		<div className={`${insideDayWithTodos ? '' : 'list-todos-component'}`}>
			<label>
				{showIncompleteOnly ? 'Showing: Only incomplete' : 'Showing: All'}
				<br />
				{showIncompleteOnly
					? 'Click to show all'
					: 'Click to show only incomplete'}
				<input
					type='checkbox'
					onClick={() => toggleShowIncompleteOnly(!showIncompleteOnly)}
				/>
			</label>
			<div
				className={`
			all-todos-listed
			${insideDayWithTodos ? 'inside-day-with-todos' : ''}
			`}
			>
				{sortedByDueDate.map((todo) => {
					const momentObjFromTodo = moment(todo.deadline);
					return (
						<TodoView
							key={todo.id}
							todoObj={todo}
							toggleCompleteTodo={crudOperations.toggleCompleteTodo}
							deleteTodo={crudOperations.deleteTodo}
							momentObjFromTodo={momentObjFromTodo}
							beginEdit={handleTodoUpdate}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default ListTodosView;

function compareByDates(a, b) {
	const aDate = moment(a.deadline);
	const bDate = moment(b.deadline);

	let returnValue;
	aDate.isBefore(bDate)
		? (returnValue = -1)
		: bDate.isBefore(aDate)
		? (returnValue = 1)
		: (returnValue = 0);

	return returnValue;
}
