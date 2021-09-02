function DayOfMonth({ day, placeHolder, today, active, cbFunc, hasTodos }) {
	const generateNotches = () => {
		// let max = hasTodos;
		// if (max > 2) max = 2;

		let innerText = `This day has ${hasTodos} todo${hasTodos > 1 ? 's' : ''}`;
		// const container = [];
		// for (let i = 0; i < max; i++) {
		// 	console.log(hasTodos);
		// 	container.push(
		// 		<span key={i} className='notch'>
		// 			|{' '}
		// 		</span>
		// 	);
		// }
		// console.log('hasTodos: ', hasTodos);
		// if (hasTodos > 2) {
		// 	container.push(<span className='notch'>...</span>);
		// }
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
