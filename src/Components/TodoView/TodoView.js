import './TodoView.css';
function TodoView({ todoObj, crudOperations }) {
	const handleUpdateTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		crudOperations.updateTodo(id);
	};

	const handleDeleteTodo = ({ target }) => {
		const id = target.parentNode.parentNode.id;
		crudOperations.deleteTodo(id);
	};

	return (
		<div className='todo-view' id={todoObj.id}>
			<div>
				<h4>{todoObj.title}</h4>
				<p>{todoObj.description}</p>
				<span>{todoObj.dateAdded}</span>
			</div>
			<div>
				<button onClick={handleUpdateTodo}>Update</button>
				<button onClick={handleDeleteTodo}>Delete</button>
			</div>
		</div>
	);
}
export default TodoView;
