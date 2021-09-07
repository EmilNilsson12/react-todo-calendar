import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './TodoForm.css';

function TodoForm({
	defaultDate,
	addTodo,
	updateMode,
	updateTodo,
	updateParams,
	setCurrentlyUpdating,
}) {
	useEffect(() => {
		console.log('updateParams: ', updateParams);

		if (updateParams) {
			console.log('updateParams.title: ', updateParams.title);
			console.log('updateParams.description: ', updateParams.description);
			console.log('updateParams.deadline: ', updateParams.deadline);

			setInputTitle(updateParams.title);
			setInputDesc(updateParams.description);
			setInputDate(updateParams.deadline);
			setInputDateValue(updateParams.deadline.split('T')[0]);

			console.log('inputTitle: ', inputTitle);
			console.log('inputDesc: ', inputDesc);
			console.log('inputDate: ', inputDate);
			console.log('inputDateValue: ', inputDateValue);
		}
	}, [updateParams]);

	const [inputTitle, setInputTitle] = useState();
	const [inputDesc, setInputDesc] = useState();
	const [inputDate, setInputDate] = useState();

	const [inputDateValue, setInputDateValue] = useState(
		moment().toISOString().split('T')[0]
	);

	const firstFocusInputElement = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log('Success');

		if (updateMode) {
			setCurrentlyUpdating(false);

			// Send new updateObj to App.js
			updateTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate,
				id: updateParams.id,
			});
		} else {
			addTodo({
				title: inputTitle,
				description: inputDesc,
				deadline: inputDate,
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
		console.log('dateComponent: ', dateComponent);

		let timeComponent = moment(inputDate).toISOString().split('T')[1];
		console.log('timeComponent: ', timeComponent);

		let newDate = moment(dateComponent + 'T' + timeComponent);
		console.log('newDate: ', newDate);

		setInputDate(newDate);
		setInputDateValue(dateComponent);
	};
	const cancelUpdate = () => {
		setCurrentlyUpdating(false);
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
