export default function Modal({title, body, onClose}) {
	return (
		<div className="modal">
			<div className="row">
				<div className="modal-title">
					<span>{title}</span>
				</div>
				<div>
					<button onClick={onClose}>Close</button>
				</div>
			</div>
			<div className="row">
				<div className="modal-body">
					<span>{body}</span>
				</div>
			</div>
		</div>
	);
}
