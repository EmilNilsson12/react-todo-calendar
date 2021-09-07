import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './TodoForm.css';

const defaultDate = moment();
const defaultDateAsValue = defaultDate.toISOString().split('T')[0];

function TodoForm({
	addTodo,
	updateMode,
	updateTodo,
	updateParams,
	setCurrentlyUpdating,
}) {
	useEffect(() => {
		if (updateParams) {
			setInputTitle(updateParams.title);
			setInputDesc(updateParams.description);
			setInputDate(updateParams.deadline);
			setInputDateValue(updateParams.deadline.split('T')[0]);
		}
	}, [updateParams]);

	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [inputDate, setInputDate] = useState(defaultDate);
	const [inputDateValue, setInputDateValue] = useState(defaultDateAsValue);

	const firstFocusInputElement = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		if (updateMode) {
			setCurrentlyUpdating(false);

			// Send new updateObj to App.js
			updateTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate.toISOString(),
				id: updateParams.id,
			});
		} else {
			addTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate.toISOString(),
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
		setInputDateValue(defaultDate);
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
				Deadline: <b>{moment(inputDate).add(8, 'h').fromNow()}</b>
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
