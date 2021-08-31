import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';

function CalenderView({ todos }) {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [today, setToday] = useState(momentObj.clone());
	const [currentViewMonth, setCurrentViewMonth] = useState();
	const [currentViewYear, setCurrentViewYear] = useState();
	const [daysInThisMonth, setDaysInThisMonth] = useState();

	const updateStates = () => {
		setCurrentViewMonth(momentObj.format('MMMM'));
		setCurrentViewYear(momentObj.format('YYYY'));
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

	const renderDays = () => {
		console.log('momentObj: ', momentObj.toString());

		// Check if today is in the currentViewMonth
		console.log('today: ', today);
		console.log('today toString(): ', today.toString());
		console.log('today formatted: ', today.format('D'));
		console.log('typeof today formatted: ', typeof today.format('D'));
		const todayAsInt = parseInt(today.format('D'), 10);
		console.log('typeof today formatted and parsed: ', typeof todayAsInt);

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
					today={i === todayAsInt && true}
				/>
			);
		}
		return components;
	};
	return (
		<div className='month-view'>
			View of current month{' '}
			<i>
				{currentViewMonth} - {currentViewYear}
			</i>
			<div>
				{currentViewMonth} has {daysInThisMonth} days
			</div>
			<WeekDays />
			<div className='grid-container calender-days'>{renderDays()}</div>
			<button onClick={prevMonth}>Prev month</button>
			<button onClick={nextMonth}>Next month</button>
		</div>
	);
}

export default CalenderView;
