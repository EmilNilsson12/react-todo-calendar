import moment from 'moment';
import './ListTodosView.css';

function ListTodosView({ todos }) {
	const sortedByDueDate = [...todos.sort(compareByDates)];
	return (
		<div className='all-todos-listed'>
			{sortedByDueDate.map((todo) => {
				const momentObjFromTodo = moment(todo.deadline);
				return (
					<div key={todo.id}>
						<h3>{todo.title}</h3>
						<p>{todo.description}</p>
						<div>Due: {momentObjFromTodo.fromNow()}</div>
					</div>
				);
			})}
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
