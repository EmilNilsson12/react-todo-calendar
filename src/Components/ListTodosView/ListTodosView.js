import { useState } from 'react';
import moment from 'moment';

import './ListTodosView.css';

import TodoForm from '../TodoForm/TodoForm';
import TodoView from '../TodoView/TodoView';

function ListTodosView({
	todos,
	crudOperations,
	insideDayWithTodos,
	showingText,
	dayToShow,
}) {
	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
	const [updateParams, setUpdateParams] = useState({});

	const [showIncompleteOnly, toggleShowIncompleteOnly] = useState(false);

	const handleTodoUpdate = (todoObj) => {
		setCurrentlyUpdating(true);
		setUpdateParams(todoObj);
	};

	let sortedAndByDueDate = [...todos.sort(compareByDates)];
	if (showIncompleteOnly) {
		sortedAndByDueDate = [
			...sortedAndByDueDate.filter((todo) => !todo.completed),
		];
	}

	const setOfTodoDates = new Set();
	for (const todo of sortedAndByDueDate) {
		setOfTodoDates.add(todo.deadline.split('T')[0]);
	}
	const setOfTodoDatesArr = Array.from(setOfTodoDates);

	const filteredTodosByDate = [];
	for (const date of setOfTodoDatesArr) {
		filteredTodosByDate.push(
			sortedAndByDueDate.filter((todo) => todo.deadline.split('T')[0] === date)
		);
	}

	const mapReturnArray = () => {
		const returnArr = [];

		for (const dateWithTodos of filteredTodosByDate) {
			returnArr.push(
				<div key={dateWithTodos[0].deadline.split('T')[0]}>
					{!insideDayWithTodos ? (
						<h2 className='todos-date-header'>
							{dateWithTodos[0].deadline.split('T')[0]}
						</h2>
					) : (
						<></>
					)}

					{dateWithTodos.map((todo) => (
						<TodoView
							key={todo.id}
							todoObj={todo}
							toggleCompleteTodo={crudOperations.toggleCompleteTodo}
							deleteTodo={crudOperations.deleteTodo}
							beginEdit={handleTodoUpdate}
						/>
					))}
				</div>
			);
		}

		return returnArr;
	};

	return currentlyUpdating ? (
		<TodoForm
			addTodo={crudOperations.addTodo}
			updateTodo={crudOperations.updateTodo}
			updateParams={updateParams}
			updateMode={true}
			setCurrentlyUpdating={setCurrentlyUpdating}
			dayToShow={moment(updateParams.deadline)}
		/>
	) : (
		<div
			className={`
			${showingText ? 'day-w-todos-grid' : ''}
		`}
		>
			{showingText ? (
				<TodoForm addTodo={crudOperations.addTodo} dayToShow={dayToShow} />
			) : (
				<></>
			)}

			<div
				className={`${
					insideDayWithTodos
						? 'list-todos-component-inside-day-with-todos'
						: 'list-todos-component'
				}`}
			>
				<label>
					{showIncompleteOnly
						? `${
								showingText
									? `Showing only incomplete todos due on ${showingText}`
									: 'Showing: All'
						  }`
						: `${
								showingText
									? `Showing all todos due on: ${showingText}`
									: 'Showing: Only incomplete'
						  }`}
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
					{insideDayWithTodos
						? filteredTodosByDate[0]?.map((todo) => (
								<TodoView
									key={todo.id}
									todoObj={todo}
									toggleCompleteTodo={crudOperations.toggleCompleteTodo}
									deleteTodo={crudOperations.deleteTodo}
									beginEdit={handleTodoUpdate}
								/>
						  ))
						: mapReturnArray()}
				</div>
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
