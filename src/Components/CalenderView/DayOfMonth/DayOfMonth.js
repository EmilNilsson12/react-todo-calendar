function DayOfMonth({ day, placeHolder, today, cbFunc }) {
	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : today ? (
				<button
					id={day + '|day of this month'}
					className='today day-div grid-child'
					onClick={cbFunc}
				>
					Day {day}
				</button>
			) : (
				<button
					id={day + '|day of this month'}
					className='day-div grid-child'
					onClick={cbFunc}
				>
					Day {day}
				</button>
			)}
		</>
	);
}

export default DayOfMonth;
