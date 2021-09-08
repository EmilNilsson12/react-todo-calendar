import { useState } from 'react';

import './TodoView.css';

function TodoView({ todoObj, toggleCompleteTodo, deleteTodo, beginEdit }) {
	const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

	const handleCompleteTodo = () => {
		toggleCompleteTodo(todoObj);
	};

	const handleUpdateTodo = () => {
		beginEdit(todoObj);
	};

	const handleDeleteTodo = () => {
		setConfirmDeleteVisible(true);
	};

	const cancelConfirmDeleteTodo = () => {
		setConfirmDeleteVisible(false);
	};

	const confirmDeleteTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		deleteTodo(id);
		setConfirmDeleteVisible(false);
	};

	return (
		<div className='todo-view' id={todoObj.id}>
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
						<button onClick={handleCompleteTodo}>Mark as complete</button>
					</>
				)}
			</div>
		</div>
	);
}
export default TodoView;
