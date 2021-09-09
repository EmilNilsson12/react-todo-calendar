function DayOfMonth({ day, placeHolder, today, active, cbFunc, numOfTodos }) {
	const generateNotches = () => {
		let innerText = `This day has ${numOfTodos} todo${
			numOfTodos > 1 ? 's' : ''
		}`;
		return innerText;
	};
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
