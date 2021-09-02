//För att hämta alla listor och items.
function getListOfTasks_DB() {
	return JSON.parse(localStorage.getItem('todos')) || [];
}
//För att lägga till en ny item till en lista.
function updateListOfTasks_DB(updatedList) {
	// GET
	const savedTasks = [...updatedList];

	// SET
	localStorage.setItem('todos', JSON.stringify(savedTasks));
}

export {
	getListOfTasks_DB,
	updateListOfTasks_DB,
	// completeTask_DB,
	// undoCompleteTask_DB,
	// scrapTask_DB,
	// undoScrapTask_DB,
	// deleteTask_DB,
};
