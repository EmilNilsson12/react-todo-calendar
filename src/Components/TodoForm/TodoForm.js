import moment from 'moment';
import { useState } from 'react';
import './TodoForm.css';
function TodoForm({ defaultDate }) {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log('Success');
	};

	const [inputDate, setInputDate] = useState(defaultDate);

	const handleDateChange = (evt) => {
		let dateComponent = evt.target.value;
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
					<input type='text' required />
				</label>
				<label>
					Additional info
					<input type='text' />
				</label>
				<label>
					Deadline: <b>{moment(inputDate).add('h', 8).fromNow()}</b>
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
