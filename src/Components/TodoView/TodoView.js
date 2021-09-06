import { useState } from 'react';
import moment from 'moment';

import TodoForm from '../TodoForm/TodoForm';

import './TodoView.css';

function TodoView({ todoObj, crudOperations }) {
	const [currentlyUpdating, setCurrentlyUpdating] = useState(false);

	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	const handleUpdateTodo = () => {
		setCurrentlyUpdating(true);
	};

	const handleDeleteTodo = () => {
		setConfirmDeleteVisible(true);
	};

	const cancelConfirmDeleteTodo = () => {
		setConfirmDeleteVisible(false);
	};

	const confirmDeleteTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		crudOperations.deleteTodo(id);
		setConfirmDeleteVisible(false);
	};

	const hideForm = () => setCurrentlyUpdating(false);

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
							hideForm={hideForm}
						/>
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
						{confirmDeleteVisible ? (
							<>
								<button onClick={confirmDeleteTodo}>Confirm delete</button>
								<button onClick={cancelConfirmDeleteTodo}>Cancel delete</button>
							</>
						) : (
							<>
								<button onClick={handleDeleteTodo}>Delete</button>
								<button onClick={handleUpdateTodo}>Update</button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
}
export default TodoView;
