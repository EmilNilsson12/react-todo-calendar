import './TodoView.css';
function TodoView({ todoObj, crudOperations }) {
	const handleUpdateTodo = () => {
		console.log('handleUpdateTodo clicked: ');
		crudOperations.updateTodo();
	};
	const handleDeleteTodo = () => {
		console.log('handleDeleteTodo clicked: ');
		crudOperations.deleteTodo();
	};

	return (
		<div className='todo-view'>
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
