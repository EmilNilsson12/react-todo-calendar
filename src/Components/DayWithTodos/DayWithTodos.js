function DayWithTodos({ day, todos }) {
	// const todosForThisDay = todos.filter((todo) => todo.deadline === day);
	return (
		<div>
			<h3>
				Todos for day <u>{day.format('D [of] MMMM, YYYY')}</u>
			</h3>
			<ul>
				{/* {todosForThisDay.map((todoObj) => (
					<li>
						<div>
							<h4>{todoObj?.title}</h4>
							<p>{todoObj?.description}</p>
							<span>{todoObj?.dateAdded}</span>
						</div>
					</li>
				))} */}
				<li>Todo...</li>
				<li>Todo...</li>
				<li>Todo...</li>
				<li>Todo...</li>
			</ul>
		</div>
	);
}

export default DayWithTodos;
