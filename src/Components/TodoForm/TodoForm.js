import { useState, useRef } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './TodoForm.css';

function TodoForm({
	defaultDate,
	addTodo,
	updateMode,
	updateTodo,
	updateParams,
	hideForm,
}) {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log('Success');

		if (updateMode) {
			// Hide updateform when done updating
			hideForm();

			// Send new updateObj to App.js
			updateTodo({
				title: inputTitle,
				description: inputDescription,
				deadline: inputDate.toISOString(),
				id: updateParams.id,
			});
		} else {
			addTodo({
				title: inputTitle,
				description: inputDescription,
				deadline: inputDate.toISOString(),
				id: uuidv4(),
			});
		}

		setInputTitle('');
		setInputDescription('');

		// Focus on Title
		firstFocusInputElement.current.focus();
	};

	const [inputTitle, setInputTitle] = useState(updateParams?.title || '');
	const [inputDescription, setInputDescription] = useState(
		updateParams?.description || ''
	);
	const [inputDate, setInputDate] = useState(defaultDate);

	const firstFocusInputElement = useRef(null);

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
	const cancelUpdate = () => {
		console.log('Update of todo canceled');
		hideForm();
	};
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Title
				<input
					type='text'
					value={inputTitle}
					onChange={handleTitleChange}
					required
					autoFocus
					ref={firstFocusInputElement}
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
			<div className='submit-btn-div'>
				<button type='submit'>
					{updateMode ? 'Update todo' : 'Add new Todo'}
				</button>
				{updateMode ? (
					<button type='button' onClick={cancelUpdate}>
						Cancel
					</button>
				) : (
					<></>
				)}
			</div>
		</form>
	);
}

export default TodoForm;
