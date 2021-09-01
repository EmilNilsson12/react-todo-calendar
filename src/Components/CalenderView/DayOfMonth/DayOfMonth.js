function DayOfMonth({ day, placeHolder, today, active, cbFunc }) {
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
						day-div
						grid-child
					`}
					onClick={cbFunc}
				>
					Day {day}
				</button>
			)}
		</>
	);
}

export default DayOfMonth;
