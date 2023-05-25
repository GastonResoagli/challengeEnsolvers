import { useEffect, useState } from "react";
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import style from "./Notes.module.css";

export default function Notes(props) {
	//utility
	let history = useHistory();
	const date = dayjs(props.lastUpdated);
	const day = date.date();
	const monthIndex = date.month();
	const year = date.year();

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];

	const monthName = monthNames[monthIndex];

	///Modal boostrap
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	///Modal boostrap 2
	const [show2, setShow2] = useState(false);
	const handleClose2 = () => setShow2(false);
	const handleShow2 = () => setShow2(true);

	//API

	const [setNote] = useState("");
	const [title, setTitle] = useState("");
	const [content, setConten] = useState("");

	const apiUrl = "http://localhost:3000/notes";

	///FUNCIONES

	const handleDeleteNote = async () => {
		try {
			const response = await axios.delete(`${apiUrl}/${props?.id}`);
			if (response.status === 200) {
				console.log("Note deleted");
				history.push("/");
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fechtData = async () => {
			try {
				const response = await axios.get(`${apiUrl}/${props.id}`);
				setNote(response.data);
				setTitle(response.data.title);
				setConten(response.data.content);
			} catch (error) {
				console.log(error);
			}
		};
		fechtData();
	});

	const handleEditNote = async () => {
		try {
			const response = await axios.patch(`${apiUrl}/${props.id}`, { title, content });
			setTitle("");
			setConten("");
			if (response.status === 200) {
				alert("Note update");
				history.push("/");
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = async () => {
		try {
			await axios.patch(`${apiUrl}/${props.id}`, { isActive: !props.isActive });
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className={style.note} style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title> {props.title} </Card.Title>
				<Card.Text>{props.content}</Card.Text>
				<Card.Text>
					{day}/{monthName}/{year}
					<Card.Text>{props.categories}</Card.Text>
				</Card.Text>

				<Button variant="warning" onClick={handleChange} className={style.Button}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-archive"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
						<path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
						<path d="M10 12l4 0"></path>
					</svg>
				</Button>

				<Button variant="success" onClick={handleShow} className={style.Button}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-pencil"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
						<path d="M13.5 6.5l4 4"></path>
					</svg>
				</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edite Note</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form on onSubmit={(e) => e.preventDefault()}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="email"
									autoFocus
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Content</Form.Label>
								<Form.Control
									as="textarea"
									value={content}
									onChange={(e) => setConten(e.target.value)}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="dark" onClick={handleClose}>
							Close
						</Button>
						<Link to="/">
							<Button variant="success" onClick={handleEditNote}>
								Save
							</Button>
						</Link>
					</Modal.Footer>
				</Modal>

				<Button variant="danger" onClick={handleShow2} className={style.Button}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-x"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M18 6l-12 12"></path>
						<path d="M6 6l12 12"></path>
					</svg>
				</Button>

				<Modal show={show2} onHide={handleClose2}>
					<Modal.Header closeButton>
						<Modal.Title>ALERT!</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to delete this note?</Modal.Body>
					<Modal.Footer>
						<Button variant="dark" onClick={handleClose2}>
							No
						</Button>
						<Link to="/">
							<Button variant="danger" onClick={handleDeleteNote}>
								Yes
							</Button>
						</Link>
					</Modal.Footer>
				</Modal>
			</Card.Body>
		</Card>
	);
}
