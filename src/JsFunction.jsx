import {getData} from "./api/api";
import {useEffect} from "react";
import {useState} from "react";

export default function JsFunction() {
	const [youngest, setYoungest] = useState();
	const [oldest, setOldest] = useState();
	const [type, setType] = useState("min");
	const [dataSort, setDataSort] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		rowsPerPage: 5,
		hasNext: true,
	});

	useEffect(() => {
		const data = getData();
		const sortByMinAge = [...data].sort((a, b) => a.age - b.age);
		setYoungest(sortByMinAge[0]);

		const sortByMaxAge = [...data].sort((a, b) => a.age > b.age);
		setOldest(sortByMaxAge[0]);
	}, []);

	useEffect(() => {
		const data = getData();
		const start = pagination.page - 1;
		const end = start + pagination.rowsPerPage;
		let sortedData;
		if (type === "min") {
			sortedData = [...data].sort((a, b) => a.age - b.age);
		} else {
			sortedData = [...data].sort((a, b) => b.age - a.age);
		}

		const paginatedData = sortedData.slice(start, end);
		setDataSort(paginatedData);

		const hasNextPage = end < sortedData.length;
		if (pagination.hasNext !== hasNextPage) {
			setPagination((prev) => ({...prev, hasNext: hasNextPage}));
		}
	}, [pagination.hasNext, pagination.page, pagination.rowsPerPage, type]);

	const nextPage = () => {
		setPagination({
			...pagination,
			page: pagination.page + 1,
		});
	};

	const prevPage = () => {
		setPagination({
			...pagination,
			page: pagination.page - 1,
		});
	};

	const changeRows = (value) => {
		setPagination({
			...pagination,
			rowsPerPage: value,
		});
	};

	return (
		<>
			{youngest && (
				<>
					<span>Name Min Age : {youngest.name} </span>
					<br />
				</>
			)}
			{oldest && (
				<>
					<span>Name Max Age : {oldest.name} </span>
					<br />
				</>
			)}
			<div className="flex">
				<button
					className={type === "min" ? "active" : ""}
					onClick={() => setType("min")}
				>
					Sort by Min Age
				</button>
				<button
					className={type === "max" ? "active" : ""}
					onClick={() => setType("max")}
				>
					Sort by Max Age
				</button>
			</div>
			<div className="row">
				<span>Data by : {type} Age</span> <br />
			</div>
			<div className="row">
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Age</th>
							<th>Occupation</th>
						</tr>
					</thead>
					<tbody>
						{dataSort.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.age}</td>
								<td>{item.occupation}</td>
							</tr>
						))}

						<tr>
							<td>Page : {pagination.page}</td>
							<td>
								<select
									name="option"
									id=""
									onChange={(e) => changeRows(e.target.value)}
								>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="20">20</option>
								</select>
							</td>
							<td>
								<button
									onClick={() => prevPage()}
									disabled={pagination.page === 1}
								>
									Back
								</button>
							</td>
							<td>
								<button
									onClick={() => nextPage()}
									disabled={!pagination.hasNext}
								>
									Next
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
