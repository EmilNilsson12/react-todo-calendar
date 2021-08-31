import { useState } from 'react';
import './App.css';
import CalenderView from './Components/CalenderView/CalenderView';
import ListTodosView from './Components/ListTodosView/ListTodosView';
import SwapView from './Components/SwapView/SwapView';

function App() {
	const [showCalender, toggleShowCalender] = useState(true);

	const callBacks = {
		swapView: () => {
			toggleShowCalender(!showCalender);
		},
	};
	return (
		<>
			{showCalender ? <CalenderView /> : <ListTodosView />}
			<SwapView cbFunc={callBacks.swapView} />
		</>
	);
}

export default App;
