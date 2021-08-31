import { useState, useEffect } from 'react';
import moment from 'moment';
function CalenderView() {
	const [momentObj, setMomentObject] = useState(() => moment());
	const [currentViewMonth, setCurrentViewMonth] = useState();
	const [currentViewYear, setCurrentViewYear] = useState();

	const updateStates = () => {
		setCurrentViewMonth(momentObj.format('MMMM'));
		setCurrentViewYear(momentObj.format('YYYY'));
	};

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
