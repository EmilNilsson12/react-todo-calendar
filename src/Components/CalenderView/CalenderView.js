import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';
import DayWithTodos from '../DayWithTodos/DayWithTodos';

function CalenderView({ todos, crudOperations }) {
	const [momentObj, setMomentObject] = useState(() => moment());

	// Today should only change when the user manually refreshes the page
	const [today, setToday] = useState(moment());
	const [currentTime, setCurrentTime] = useState(
		today.toString().split(' ')[4]
	);

	const [currentYear, setCurrentYear] = useState(
		momentObj.clone().format('YYYY')
	);

	useEffect(() => {
		// Only update state if the calendar shows a new year
		if (currentYear !== momentObj.clone().format('YYYY')) {
			setCurrentYear(momentObj.clone().format('YYYY'));
		}

		// Make sure to only fetch from the API once a year
		if (!localStorage.getItem(`year-${currentYear}`)) {
			// Add the current year to LS to prevent multiple fetches for the same year
			localStorage.setItem(`year-${currentYear}`, currentYear);

			fetch(`http://sholiday.faboul.se/dagar/v2.1/${currentYear}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					// Add the fetched holidays to LS
					localStorage.setItem(
						`year-${currentYear}-holidays`,
						JSON.stringify(data.dagar)
					);
				});
		}
	}, [currentYear, momentObj]);

	useEffect(() => {
		setCurrentTime(momentObj.toString().split(' ')[4]);
	}, [momentObj]);

	const prevMonth = () => {
		const dateComponent = momentObj
			.clone()
			.subtract(1, 'M')
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
		setMomentObject(newMomentObj);
	};

	const nextMonth = () => {
		const dateComponent = momentObj
			.clone()
			.add(1, 'M')
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
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

		const dateComponent = momentObj
			.clone()
			.date(clickedDate)
			.toISOString()
			.split('T')[0];

		const newMomentObj = moment(dateComponent + 'T' + currentTime);
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
					redDay={isAHoliday(momentObj, i)}
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
	const num = todos.filter(
		(todo) => todo.deadline.split('T')[0] === compareDate
	).length;

	return num;
}

function itIsActive(momentObj, activeDayAsInt) {
	const activeDayFormatted = parseInt(momentObj.clone().format('D'), 10);
	return activeDayFormatted === activeDayAsInt;
}

function itIsToday(todayObj, todayAsInt) {
	const todayFormatted = parseInt(todayObj.clone().format('D'), 10);
	return todayFormatted === todayAsInt;
}

function isAHoliday(momentObj, dayAsInt) {
	const yearNum = momentObj.format('YYYY').toString();
	const monthNum = momentObj.format('MM').toString();

	// Find object in array for current year
	const dayInArray = JSON.parse(
		localStorage.getItem(`year-${yearNum}-holidays`)
	).find((day) => day.datum === `${yearNum}-${monthNum}-${dayAsInt}`);

	// Ignore undefined days
	if (dayInArray) {
		const isHoliday = dayInArray['röd dag'];
		return isHoliday ? true : false;
	} else {
		return false;
	}
}
