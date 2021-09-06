import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';
import DayWithTodos from '../DayWithTodos/DayWithTodos';

function CalenderView({ todos, crudOperations }) {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [today, setToday] = useState(momentObj.clone());

	const [currentViewDay, setCurrentViewDay] = useState();
	const [currentViewMonth, setCurrentViewMonth] = useState();
	const [currentViewYear, setCurrentViewYear] = useState();

	const [daysInThisMonth, setDaysInThisMonth] = useState();

	// console.log('currentDayInFocus: ', currentDayInFocus);

	const updateStates = () => {
		setCurrentViewDay(parseInt(momentObj.format('D'), 10));
		setCurrentViewMonth(parseInt(momentObj.format('M'), 10));
		setCurrentViewYear(parseInt(momentObj.format('YYYY'), 10));
		setDaysInThisMonth(momentObj.daysInMonth());
	};

	// Only fired once since momentObj is only ever mutated, never re-assigned
	// Basically componentDidMount
	useEffect(() => {
		updateStates();
	}, []);

	const prevMonth = () => {
		momentObj.subtract(1, 'M');
		updateStates();
	};

	const nextMonth = () => {
		momentObj.add(1, 'M');
		updateStates();
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
		setCurrentViewDay(clickedDate);
		momentObj.date(clickedDate);
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

		for (let i = 1; i <= daysInThisMonth; i++) {
			components.push(
				<DayOfMonth
					key={`Day ${i} of month`}
					placeHolder={false}
					day={i}
					// Today is only true when it's today
					today={itIsToday(today, currentViewMonth, currentViewYear, i)}
					active={itIsActive(currentViewDay, i)}
					cbFunc={dateClicked}
					hasTodos={checkIfDayHasTodos(
						currentViewMonth,
						currentViewYear,
						i,
						todos
					)}
				/>
			);
		}
		return components;
	};
	return (
		<>
			<div className='month-view'>
				<h2>
					<i>
						{momentObj.format('MMMM')} - {momentObj.format('YYYY')}
					</i>
				</h2>
				<button onClick={prevMonth}>Prev month</button>
				<button onClick={nextMonth}>Next month</button>
				<WeekDays />
				<div className='grid-container calender-days'>{renderDays()}</div>
			</div>
			<DayWithTodos
				dayToShow={momentObj}
				todos={todos}
				crudOperations={crudOperations}
			/>
		</>
	);
}

export default CalenderView;

function checkIfDayHasTodos(
	currentViewMonth,
	currentViewYear,
	currentIterationDay,
	todos
) {
	const formattedParam = formatDate(
		currentViewYear,
		currentViewMonth,
		currentIterationDay
	);
	const compareDate = moment(formattedParam).format('YYYY-MM-DD');

	let numOfDeadlinesOnThisDate = 0;
	todos.forEach((todo) => {
		const thisDayHasDeadlines = todo.deadline.split('T')[0] === compareDate;
		if (thisDayHasDeadlines) {
			numOfDeadlinesOnThisDate++;
		}
	});

	return numOfDeadlinesOnThisDate;
}

function itIsActive(currentViewDay, activeDayAsInt) {
	return activeDayAsInt === currentViewDay;
}

function itIsToday(
	momentObjToday,
	currentViewMonth,
	currentViewYear,
	todayAsInt
) {
	// Check if today is in the currentViewMonth
	const todayDateAsInt = parseInt(momentObjToday.format('D'), 10);
	const todayMonthAsInt = parseInt(momentObjToday.format('M'), 10);
	const todayYearAsInt = parseInt(momentObjToday.format('YYYY'), 10);

	const correctMonth = todayMonthAsInt === currentViewMonth;
	const correctYear = todayYearAsInt === currentViewYear;
	const correctDay = todayDateAsInt === todayAsInt;

	return correctMonth && correctYear && correctDay;
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
