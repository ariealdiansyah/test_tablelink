import {useState} from "react";
import "./App.css";
import Counter from "./Counter";
import JsFunction from "./JsFunction";
import Modal from "./Modal";

function App() {
	const [dialog, setDialog] = useState(false);
	return (
		<>
			<Counter />
			<JsFunction />
			<button onClick={() => setDialog(!dialog)}>Modal</button>
			{dialog && (
				<Modal
					title={"Test"}
					onClose={() => setDialog(false)}
					body={"Test Body"}
				/>
			)}
		</>
	);
}

export default App;
