async function GetAllTodos(cb) {
	await fetch(
		// 'https://612896ae86a213001729f9c0.mockapi.io/todosWithDealineDates'
		'http://localhost:3000/myJson.json',
		{ headers: { Accept: 'application/json' } }
	)
		.then((res) => res.json())
		.then((data) => cb(data));
}

export default GetAllTodos;
