import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './TodoForm.css';

function TodoForm({
	addTodo,
	updateTodo,
	dayToShow,
	updateMode,
	updateParams,
	setCurrentlyUpdating,
}) {
	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputDate, setInputDate] = useState(dayToShow);
	const [inputDateValue, setInputDateValue] = useState('');

	const firstFocusInputElement = useRef(null);

	// inputDate and inputDateValue should update when the form is mounted
	// and when dayToShow is updated

	// dayToShow needs to be anything other than an object

	useEffect(() => {
		if (dayToShow) {
			setInputDate(dayToShow);
			setInputDateValue(dayToShow.toISOString().split('T')[0]);
		}
	}, [dayToShow]);

	useEffect(() => {
		// Makes sure title input is in focus even when initiating an update
		firstFocusInputElement.current.focus();

		if (updateParams) {
			setInputTitle(updateParams.title);
			setInputDesc(updateParams.description);
		}
	}, [updateMode]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		// Get current timestamp
		const newTimeComponent = moment().toISOString().split('T')[1];

		if (updateMode) {
			setCurrentlyUpdating(false);

			// Send new updateObj to App.js
			updateTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate
					.toISOString()
					.split('T')[0]
					.concat('T', newTimeComponent),
				id: updateParams.id,
			});
		} else {
			addTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate
					.toISOString()
					.split('T')[0]
					.concat('T', newTimeComponent),
				id: uuidv4(),
			});
		}

		setInputTitle('');
		setInputDesc('');

		// Focus on Title
		firstFocusInputElement.current.focus();
	};

	const handleTitleChange = ({ target }) => {
		setInputTitle(target.value);
	};

	const handleDescriptionChange = ({ target }) => {
		setInputDesc(target.value);
	};

	const handleDateChange = ({ target }) => {
		let dateComponent = target.value;

		let timeComponent = moment(inputDate).toISOString().split('T')[1];

		let datePlusTime = dateComponent + 'T' + timeComponent;

		let newDate = moment(datePlusTime);

		setInputDate(newDate);
		setInputDateValue(dateComponent);
	};
	const cancelUpdate = () => {
		setCurrentlyUpdating(false);

		setInputTitle('');
		setInputDesc('');
		setInputDate(moment());
		setInputDateValue(moment().toISOString().split('T')[0]);
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
				<textarea value={inputDesc} onChange={handleDescriptionChange} />
			</label>
			<label>
				Deadline: <b>{inputDate.endOf('days').fromNow()}</b>
				<input
					type='date'
					value={inputDateValue}
					onChange={handleDateChange}
					required
				/>
			</label>
			<div className='submit-btn-div'>
				<button type='submit'>
					{updateMode ? 'Update todo' : 'Add new Todo'}
				</button>
				{updateMode && (
					<button type='button' onClick={cancelUpdate}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}

export default TodoForm;
