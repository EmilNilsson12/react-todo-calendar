import { useState } from 'react';
import './TodoForm.css';
function TodoForm({ defaultDate }) {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log('Success');
	};

	const [inputDate, setInputDate] = useState(defaultDate.format('YYYY-MM-DD'));

	const handleDateChange = (evt) => {
		console.log('Date changed to: ', evt.target.value);
		setInputDate(evt.target.value);
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
					Deadline
					<input
						type='date'
						value={inputDate}
						onChange={handleDateChange}
						required
					/>
				</label>
				<input type='submit' />
			</form>
		</>
	);
}

export default TodoForm;
