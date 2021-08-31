function DayOfMonth({ day, placeHolder, today }) {
	return (
		<>
			{placeHolder ? (
				<div className='placeholder grid-child'></div>
			) : today ? (
				<div className='today day-div grid-child'>Day {day}</div>
			) : (
				<div className='day-div grid-child'>Day {day}</div>
			)}
		</>
	);

	// <div className='day-div grid-child'> fdf</div>;
}

export default DayOfMonth;
