function DayOfMonth({ day, placeHolder, today }) {
	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : today ? (
				<button id='today' className='day-div grid-child'>
					Day {day}
				</button>
			) : (
				<button className='day-div grid-child'>Day {day}</button>
			)}
		</>
	);

	// <div className='day-div grid-child'> fdf</div>;
}

export default DayOfMonth;
