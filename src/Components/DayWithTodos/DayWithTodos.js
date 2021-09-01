function DayWithTodos({ dayToShow, todos }) {
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
				Todos for day <u>{dayToShow.format('D [of] MMMM, YYYY')}</u>
			</h3>
			{todosForThisDay.length > 0 ? (
				<ul>
					{todosForThisDay.map((todoObj) => (
						<li>
							<div>
								<h4>{todoObj?.title}</h4>
								<p>{todoObj?.description}</p>
								<span>{todoObj?.dateAdded}</span>
							</div>
						</li>
					))}
				</ul>
			) : (
				<i>No todos for this day...</i>
			)}
		</div>
	);
}

export default DayWithTodos;
