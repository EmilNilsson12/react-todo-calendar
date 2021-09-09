import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';
import DayWithTodos from '../DayWithTodos/DayWithTodos';

function CalenderView({ todos, crudOperations }) {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [currentTime, setCurrentTime] = useState(
		momentObj.toISOString().split('T')[1]
	);

	// Today should only change when the user manually refreshes the page
	const [today, setToday] = useState(momentObj.clone());

	useEffect(() => {
		console.log('Test if react reacts to newMomentObj');
	}, [momentObj]);

	const prevMonth = () => {
		const newMomentObj = momentObj.clone().subtract(1, 'M');
		setMomentObject(newMomentObj);
	};

	const nextMonth = () => {
		const newMomentObj = momentObj.clone().add(1, 'M');
		setMomentObject(newMomentObj);
	};

	const dateClicked = ({ target }) => {
		let clickedDate;
		if (target.textContent === '|') {
			clickedDate = parseInt(target.parentNode.parentNode.id.split('|')[0]);
		} else if (target.id === '') {
			clickedDate = parseInt(target.parentNode.id.split('|')[0]);
		} else {
			clickedDate = parseInt(target.id.split('|')[0]);
		}

		const newMomentObj = momentObj.clone().date(clickedDate);
		setMomentObject(newMomentObj);
	};

	const renderDays = () => {
		const components = [];

		// Get weekday of first of month as int to create "shadow-days" when a month doesnt start on a sunday
		const numOfPlaceholderDays = momentObj.clone().startOf('month').format('e');
		for (let i = 1; i <= numOfPlaceholderDays; i++) {
			components.push(
				<DayOfMonth key={`null ${i} of month`} placeHolder={true} />
			);
		}

		for (let i = 1; i <= momentObj.daysInMonth(); i++) {
			components.push(
				<DayOfMonth
					key={`Day ${i} of month`}
					placeHolder={false}
					day={i}
					// Today is only true when it's today
					today={itIsToday(today, i)}
					active={itIsActive(momentObj, i)}
					cbFunc={dateClicked}
					numOfTodos={getNumOfTodosDueThisDay(momentObj, todos, i)}
				/>
			);
		}
		return components;
	};
	return (
		<div className='calendar'>
			<div className='month-view'>
				<div className='month-navigator'>
					<button onClick={prevMonth}>Prev month</button>
					<h2 className='current-month'>
						<i>
							{momentObj.format('MMMM')} - {momentObj.format('YYYY')}
						</i>
					</h2>
					<button onClick={nextMonth}>Next month</button>
				</div>
				<WeekDays />
				<div className='grid-container calender-days'>{renderDays()}</div>
			</div>
			<DayWithTodos
				dayToShow={momentObj}
				todos={todos}
				crudOperations={crudOperations}
			/>
		</div>
	);
}

export default CalenderView;

function getNumOfTodosDueThisDay(momentObj, todos, i) {
	const compareDate = momentObj.clone().set('date', i).format('YYYY-MM-DD');

	// Get number of todos for this day
	let num = todos.filter(
		(todo) => todo.deadline.split('T')[0] === compareDate
	).length;

	return num;
}

function itIsActive(momentObj, activeDayAsInt) {
	const todayFormatted = parseInt(momentObj.clone().format('D'), 10);
	return todayFormatted === activeDayAsInt;
}

function itIsToday(todayObj, todayAsInt) {
	const todayFormatted = parseInt(todayObj.clone().format('D'), 10);
	return todayFormatted === todayAsInt;
}

function formatDate(year, month, day) {
	// If month.toString.length = 1
	// add leading 0
	let monthAsString = month.toString();
	if (monthAsString.length === 1) monthAsString = '0' + monthAsString;

	// If day.toString.length = 1
	// add leading 0
	let dayAsString = day.toString();
	if (dayAsString.length === 1) dayAsString = '0' + dayAsString;

	const formatted = `${year}-${monthAsString}-${dayAsString}`;
	return formatted;
}
