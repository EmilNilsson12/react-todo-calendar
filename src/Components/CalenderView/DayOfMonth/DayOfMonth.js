function DayOfMonth({ day, placeHolder, today, cbFunc }) {
	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : today ? (
				<button id='today' className='day-div grid-child' onClick={cbFunc}>
					Day {day}
				</button>
			) : (
				<button className='day-div grid-child' onClick={cbFunc}>
					Day <span>{day}</span>
				</button>
			)}
		</>
	);
}

export default DayOfMonth;
