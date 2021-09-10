function DayOfMonth({
	day,
	placeHolder,
	today,
	active,
	cbFunc,
	numOfTodos,
	holiday,
}) {
	const generateNotches = () => {
		let innerText = `This day has ${numOfTodos} todo${
			numOfTodos > 1 ? 's' : ''
		}`;
		return innerText;
	};

	if (!placeHolder) {
		console.log(day);
		console.log(holiday);
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
						${holiday ? 'is-holiday' : ''}
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
