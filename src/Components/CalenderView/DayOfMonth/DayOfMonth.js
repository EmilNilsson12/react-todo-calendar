function DayOfMonth({
	day,
	placeHolder,
	today,
	active,
	cbFunc,
	numOfTodos,
	dayValues,
}) {
	const generateNotches = () => {
		let innerText = `This day has ${numOfTodos} todo${
			numOfTodos > 1 ? 's' : ''
		}`;
		return innerText;
	};

	if (!placeHolder) {
		// console.table(dayValues.namnsdag);
	}
	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : (
				<button
					id={day + '|day of this month'}
					className={`
						${today ? 'today' : ''}
						${active ? 'active-day' : ''}
						${numOfTodos ? 'has-todos' : ''}
						${isHoliday(dayValues) ? 'is-holiday' : ''}
						${isFlagDay(dayValues) ? 'is-flag-day' : ''}
						day-div
						grid-child
					`}
					onClick={cbFunc}
				>
					{numOfTodos ? (
						<div className='notch-container'>{generateNotches()}</div>
					) : (
						<> </>
					)}
					<div className='date-num'>{day}</div>
				</button>
			)}
		</>
	);
}

export default DayOfMonth;

function isHoliday(dayValues) {
	return dayValues['röd dag'] === 'Ja' || dayValues['arbetsfri dag'] === 'Ja';
}

function isFlagDay(dayValues) {
	return dayValues['flaggdag'] !== '';
}
