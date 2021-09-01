import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';
import DayWithTodos from '../DayWithTodos/DayWithTodos';

function CalenderView({ todos }) {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [today, setToday] = useState(momentObj.clone());

	const [currentViewMonth, setCurrentViewMonth] = useState();
	const [currentViewYear, setCurrentViewYear] = useState();
	const [daysInThisMonth, setDaysInThisMonth] = useState();

	const updateStates = () => {
		setCurrentViewMonth(parseInt(momentObj.format('M'), 10));
		setCurrentViewYear(parseInt(momentObj.format('YYYY'), 10));
		setDaysInThisMonth(momentObj.daysInMonth());
	};

	// Only fired once since momentObj is only ever mutated, never re-assigned
	// Basically componentDidMount
	useEffect(() => {
		updateStates();
	}, [momentObj]);

	const prevMonth = () => {
		momentObj.subtract(1, 'M');
		updateStates();
	};

	const nextMonth = () => {
		momentObj.add(1, 'M');
		updateStates();
	};

	const showTasksForClickedDay = ({ target }) => {
		console.log('Clicked', target);
		console.log('Clicked day: ', target.querySelector('span').textContent);
		const clickedDate = parseInt(target.querySelector('span').textContent, 10);
		console.log('clickedDate: ', clickedDate);
		console.log('typeof clickedDate: ', typeof clickedDate);
	};

	const renderDays = () => {
		const components = [];

		// Get weekday of first of month as int to create "shadow-days" when a month doesnt start on a sunday
		const numOfPlaceholderDays = momentObj.clone().startOf('month').format('e');
		for (let i = 0; i < numOfPlaceholderDays; i++) {
			components.push(
				<DayOfMonth
					key={`placeHolder-${i}-${currentViewMonth}-${currentViewYear}`}
					placeHolder={true}
				/>
			);
		}

		for (let i = 1; i <= daysInThisMonth; i++) {
			components.push(
				<DayOfMonth
					key={`${i}-${currentViewMonth}-${currentViewYear}`}
					placeHolder={false}
					day={i}
					// Today is only true when it's today
					today={itIsToday(today, currentViewMonth, currentViewYear, i)}
					cbFunc={showTasksForClickedDay}
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
				<div>
					{momentObj.format('MMMM')} has {daysInThisMonth} days
				</div>
				<button onClick={prevMonth}>Prev month</button>
				<button onClick={nextMonth}>Next month</button>
				<WeekDays />
				<div className='grid-container calender-days'>{renderDays()}</div>
			</div>
			<DayWithTodos day={today} />
		</>
	);
}

export default CalenderView;

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
