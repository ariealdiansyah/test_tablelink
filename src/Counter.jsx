import {useState} from "react";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<>
			<span>Counter</span>
			<button onClick={() => setCount(count + 1)}>{count}</button> <br />
      <button onClick={() => setCount(0)}>Reset</button> <br />
		</>
	);
}
