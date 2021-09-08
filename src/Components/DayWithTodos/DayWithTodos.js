import { useState } from 'react';

import './DayWithTodos.css';

import TodoForm from '../TodoForm/TodoForm';
import ListTodosView from '../ListTodosView/ListTodosView';

function DayWithTodos({ dayToShow, todos, crudOperations }) {
	const todosForThisDay = todos.filter((todo) =>
		dayToShow.isSame(todo.deadline, 'date')
	);

	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
	const [updateParams, setUpdateParams] = useState({});

	const handleTodoUpdate = (todoObj) => {
		setCurrentlyUpdating(true);
		setUpdateParams(todoObj);
	};

	return currentlyUpdating ? (
		<TodoForm
			addTodo={crudOperations.addTodo}
			updateTodo={crudOperations.updateTodo}
			updateParams={updateParams}
			updateMode={true}
			setCurrentlyUpdating={setCurrentlyUpdating}
			dayToShow={dayToShow}
		/>
	) : (
		<div className='day-with-todos'>
			<TodoForm addTodo={crudOperations.addTodo} dayToShow={dayToShow} />
			<div className='grid-day-with-todos'>
				<h3>
					Todos due on <u>{dayToShow.format('D [of] MMMM, YYYY')}</u>
				</h3>
				{todosForThisDay.length > 0 ? (
					<ListTodosView
						todos={todosForThisDay}
						crudOperations={crudOperations}
						insideDayWithTodos={true}
					/>
				) : (
					<i>No todos due this day...</i>
				)}
			</div>
		</div>
	);
}

export default DayWithTodos;
