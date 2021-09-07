function DayOfMonth({ day, placeHolder, today, active, cbFunc, hasTodos }) {
	const generateNotches = () => {
		let innerText = `This day has ${hasTodos} todo${hasTodos > 1 ? 's' : ''}`;
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
						${hasTodos ? 'has-todos' : ''}
						day-div
						grid-child
					`}
					onClick={cbFunc}
				>
					{hasTodos ? (
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
