import { useEffect, useState } from "react";
import Notes from "./Notes";
import style from "./Archived.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";

export default function Archive() {
	const [notes, setNotes] = useState([]);

	const apiUrl = "http://localhost:3000/notes";

	useEffect(() => {
		fetch(`${apiUrl}/archive`)
			.then((res) => res.json())
			.then((data) => setNotes(data));
	}, []);

	console.log(apiUrl);

	return (
		<div>
			<h1 className={style.text}>Archived Notes</h1>

			<Link to="/">
				<Button variant="dark" className={style.button}>
					My Notes
				</Button>
			</Link>
			<div className={style.gg}>
				{notes.map((note) => (
					<Notes
						key={note.id}
						id={note.id}
						title={note.title}
						content={note.content}
						lastupdate={note.lastupdate}
						isActive={note.isActive}
					/>
				))}
			</div>
		</div>
	);
}
