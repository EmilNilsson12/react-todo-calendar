import TodoForm from '../TodoForm/TodoForm';

function DayWithTodos({ dayToShow, todos, crudOperations }) {
	console.log('todos: ', todos);
	console.log('dayToShow: ', dayToShow);
	const todosForThisDay = todos.filter((todo) =>
		dayToShow.isSame(todo.deadline, 'date')
	);
	console.log('todosForThisDay: ', todosForThisDay);
	console.log(
		todosForThisDay.length > 0
			? todosForThisDay
			: 'no todos have dealine on this day'
	);

	return (
		<div>
			<h3>
				Todos due on <u>{dayToShow.format('D [of] MMMM, YYYY')}</u>
			</h3>
			{todosForThisDay.length > 0 ? (
				<>
					<ul>
						{todosForThisDay.map((todoObj) => (
							<li key={todoObj.id}>
								<div>
									<h4>{todoObj.title}</h4>
									<p>{todoObj.description}</p>
									<span>{todoObj.dateAdded}</span>
								</div>
							</li>
						))}
					</ul>
				</>
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
