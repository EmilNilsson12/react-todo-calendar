import { useState } from 'react';
import moment from 'moment';

import './ListTodosView.css';

import TodoForm from '../TodoForm/TodoForm';
import TodoView from '../TodoView/TodoView';

function ListTodosView({ todos, crudOperations }) {
	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);

	const sortedByDueDate = [...todos.sort(compareByDates)];
	return (
		<>
			<TodoForm addTodo={crudOperations.addTodo} defaultDate={moment()} />
			<div className='all-todos-listed'>
				{sortedByDueDate.map((todo, i) => {
					const momentObjFromTodo = moment(todo.deadline);
					return (
						<TodoView
							crudOperations={crudOperations}
							key={i}
							todoObj={todo}
							momentObjFromTodo={momentObjFromTodo}
						/>
					);
				})}
			</div>
		</>
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
