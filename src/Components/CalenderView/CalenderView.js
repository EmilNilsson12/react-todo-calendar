import { useState, useEffect } from 'react';
import moment from 'moment';
function CalenderView() {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [currentViewMonth, setCurrentViewMonth] = useState();
	const [currentViewYear, setCurrentViewYear] = useState();

	useEffect(() => {
		setCurrentViewMonth(momentObj.format('MMMM'));
		setCurrentViewYear(momentObj.format('YYYY'));
	}, [momentObj]);

	const prevMonth = () => {
		console.log('Show prev month');
		momentObj.subtract(1, 'M');
		setCurrentViewMonth(momentObj.format('MMMM'));
		setCurrentViewYear(momentObj.format('YYYY'));
	};

	const nextMonth = () => {
		console.log('Show next month');
		momentObj.add(1, 'M');
		setCurrentViewMonth(momentObj.format('MMMM'));
		setCurrentViewYear(momentObj.format('YYYY'));
	};

	useEffect(() => {
		console.log('Calender now visible');
	}, []);

	return (
		<div>
			View of current month{' '}
			<i>
				{currentViewMonth} - {currentViewYear}
			</i>
			<button onClick={prevMonth}>Prev month</button>
			<button onClick={nextMonth}>Next month</button>
		</div>
	);
}

export default CalenderView;
