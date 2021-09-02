import moment from 'moment';
import { useState } from 'react';
import './TodoForm.css';
function TodoForm({ defaultDate, addTodo }) {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log('Success');
		addTodo({
			inputTitle,
			inputDescription,
			inputDate,
		});
		setInputTitle('');
		setInputDescription('');
	};

	const [inputTitle, setInputTitle] = useState('');
	const [inputDescription, setInputDescription] = useState('');
	const [inputDate, setInputDate] = useState(defaultDate);

	const handleTitleChange = ({ target }) => {
		setInputTitle(target.value);
	};

	const handleDescriptionChange = ({ target }) => {
		setInputDescription(target.value);
	};

	const handleDateChange = ({ target }) => {
		let dateComponent = target.value;
		let timeComponent = defaultDate.toISOString().split('T')[1];
		let newDate = moment(dateComponent + 'T' + timeComponent);

		setInputDate(newDate);
	};
	return (
		<>
			<h3>Add a new todo using the form below!</h3>

			<form onSubmit={handleSubmit}>
				<label>
					Title
					<input
						type='text'
						value={inputTitle}
						onChange={handleTitleChange}
						required
					/>
				</label>
				<label>
					Additional info
					<input
						type='text'
						value={inputDescription}
						onChange={handleDescriptionChange}
					/>
				</label>
				<label>
					Deadline: <b>{moment(inputDate).add(8, 'h').fromNow()}</b>
					<input
						type='date'
						value={inputDate.toISOString().split('T')[0]}
						onChange={handleDateChange}
						required
					/>
				</label>
				<input type='submit' value='Add new Todo' />
			</form>
		</>
	);
}

export default TodoForm;
