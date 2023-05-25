import { useEffect, useState } from "react";
import Notes from "../components/Notes";
import style from "./Home.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {
	let history = useHistory();
	const [notes, setNotes] = useState([]);
	////EStados y Conecciones
	const apiUrl = "http://localhost:3000";

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [title, setTitle] = useState("");
	const [content, setConten] = useState("");

	///Funciones

	const handleSubmit = async () => {
		try {
			const response = await axios.post(`${apiUrl}/notes`, { title, content });
			if (response.status === 201) {
				alert("Note created Succefully");
				setTitle("");
				setConten("");
				history.push("/");
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch(`${apiUrl}/notes`)
			.then((res) => res.json())
			.then((data) => setNotes(data));
	}, []);

	return (
		///// BOTONES DEL HOME
		<div>
			<h1 className={style.text}>My Notes </h1>
			<Button variant="dark" className={style.button} onClick={handleShow}>
				Create Note
			</Button>
			<Link to="archive">
				<Button variant="dark" className={style.button}>
					Archived Notes
				</Button>
			</Link>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form on onSubmit={(e) => e.preventDefault()}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Title</Form.Label>
							<Form.Control type="email" autoFocus onChange={(e) => setTitle(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Content</Form.Label>
							<Form.Control as="textarea" onChange={(e) => setConten(e.target.value)} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Link to="/">
						<Button variant="dark" onClick={handleClose}>
							Close
						</Button>
					</Link>
					<Button variant="success" onClick={handleSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
			<div />
			<div className={style.home}>
				{notes.map((note) => (
					<Notes
						key={note.id}
						id={note.id}
						title={note.title}
						content={note.content}
						lastupdate={note.lastupdate}
						isActive={note.isActive}
						categories={note.categories.name}
					/>
				))}
			</div>
		</div>
	);
}
