import { useState } from 'react';
import moment from 'moment';

import TodoForm from '../TodoForm/TodoForm';
import TodoView from '../TodoView/TodoView';

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
		<>
			<div>
				<TodoForm
					addTodo={crudOperations.addTodo}
					updateTodo={crudOperations.updateTodo}
					defaultDate={moment(updateParams.deadline)}
					updateParams={updateParams}
					updateMode={true}
					setCurrentlyUpdating={setCurrentlyUpdating}
				/>
			</div>
		</>
	) : (
		<div>
			<h3>
				Todos due on <u>{dayToShow.format('D [of] MMMM, YYYY')}</u>
			</h3>
			{todosForThisDay.length > 0 ? (
				<div>
					{todosForThisDay.map((todoObj) => (
						<TodoView
							todoObj={todoObj}
							crudOperations={crudOperations}
							handleTodoUpdate={handleTodoUpdate}
						/>
					))}
				</div>
			) : (
				<>
					<i>No todos due this day...</i>
				</>
			)}
			<TodoForm defaultDate={dayToShow} addTodo={crudOperations.addTodo} />
		</div>
	);
}

export default DayWithTodos;
