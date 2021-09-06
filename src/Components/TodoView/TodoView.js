import { useState } from 'react';
import moment from 'moment';

import TodoForm from '../TodoForm/TodoForm';

import './TodoView.css';

function TodoView({ todoObj, crudOperations }) {
	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);

	const handleUpdateTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		setCurrentlyUpdating(true);
		crudOperations.updateTodo(id);
	};

	const handleDeleteTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		crudOperations.deleteTodo(id);
	};

	return (
		<div className='todo-view' id={todoObj.id}>
			{currentlyUpdating ? (
				<>
					<div>
						<h4>Update in progress</h4>
						<TodoForm
							addTodo={crudOperations.addTodo}
							defaultDate={moment(todoObj.deadline)}
							updateMode={true}
							updateParams={todoObj}
							updateTodo={crudOperations.updateTodo}
						/>
					</div>
					<div>
						<button>Done</button>
						<button>Cancel</button>
					</div>
				</>
			) : (
				<>
					<div>
						<h4>{todoObj.title}</h4>
						<p>{todoObj.description}</p>
						<span>{todoObj.dateAdded}</span>
					</div>
					<div>
						<button onClick={handleUpdateTodo}>Update</button>
						<button onClick={handleDeleteTodo}>Delete</button>
					</div>
				</>
			)}
		</div>
	);
}
export default TodoView;
