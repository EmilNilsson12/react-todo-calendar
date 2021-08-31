import { useState, useEffect } from 'react';
import moment from 'moment';
import DayOfMonth from './DayOfMonth/DayOfMonth';

import './CalenderView.css';
import WeekDays from './WeekDays/WeekDays';

function CalenderView({ todos }) {
	const [momentObj, setMomentObject] = useState(() => moment());
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
		const components = [];

		for (let i = 1; i <= daysInThisMonth; i++) {
			components.push(
				<DayOfMonth
					key={`${i}-${currentViewMonth}-${currentViewYear}`}
					day={i}
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
			<div className='grid-container'>{renderDays()}</div>
			<button onClick={prevMonth}>Prev month</button>
			<button onClick={nextMonth}>Next month</button>
		</div>
	);
}

export default CalenderView;
