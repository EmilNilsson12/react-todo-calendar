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
				{todosForThisDay.length > 0 ? (
					<ListTodosView
						todos={todosForThisDay}
						crudOperations={crudOperations}
						insideDayWithTodos={true}
						showingText={dayToShow.format('D [of] MMMM, YYYY')}
					/>
				) : (
					<i>No todos due this day...</i>
				)}
			</div>
		</div>
	);
}

export default DayWithTodos;
