import './DayWithTodos.css';

import TodoForm from '../TodoForm/TodoForm';
import ListTodosView from '../ListTodosView/ListTodosView';

function DayWithTodos({ dayToShow, todos, crudOperations, dayValues }) {
	const todosForThisDay = todos.filter((todo) =>
		dayToShow.isSame(todo.deadline, 'date')
	);

	return (
		<div className='day-with-todos'>
			<p>{dayToShow.format('D [of] MMMM, YYYY')}</p>

			{dayValues?.namnsdag.length ? (
				<p>
					Idag har <u>{dayValues?.namnsdag.join(' och ')}</u> namnsdag!
				</p>
			) : (
				<></>
			)}
			{dayValues?.flaggdag !== '' ? (
				<p>
					Hissa flaggan för idag är det: <u>{dayValues?.flaggdag}</u>
				</p>
			) : (
				<></>
			)}
			<div className='grid-day-with-todos'>
				{todosForThisDay.length > 0 ? (
					<ListTodosView
						todos={todosForThisDay}
						crudOperations={crudOperations}
						insideDayWithTodos={true}
						dayToShow={dayToShow}
						hideDoneTodosByDefault={true}
					/>
				) : (
					<div className='day-w-out-todos'>
						<TodoForm addTodo={crudOperations.addTodo} dayToShow={dayToShow} />
						<div>
							<i>No todos due this day...</i>{' '}
							<p>Use the form to add a new todo on this day!</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default DayWithTodos;
