import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../../../components/molecules/header/user";
import {
	addDataToFirebase,
	deleteDataFromFirebase,
	getDataFromFirebase,
	updateDataFromFirebase,
} from "../../../config/redux/action";
import "./Dashboard.scss";

class Dashboard extends Component {
	state = {
		title: "",
		content: "",
		date: "",
		textButton: "SIMPAN",
		noteId: "",
	};

	componentDidMount() {
		const userData = JSON.parse(localStorage.getItem("UserData"));
		this.props.getNotes(userData._Id);
	}

	handleSavesNotes = () => {
		const { title, content, textButton, noteId } = this.state;
		const { saveNotes, updateNotesAPI } = this.props;
		const userData = JSON.parse(localStorage.getItem("UserData"));
		const data = {
			title: title,
			content: content,
			date: new Date().toString(),
			userId: userData._Id,
		};

		if (textButton === "SIMPAN") {
			saveNotes(data);
		} else {
			data.noteId = noteId;
			updateNotesAPI(data);
		}

		// console.log(this.props.userData);
	};

	inputState = (e, type) => {
		this.setState({
			[type]: e.target.value,
		});
	};
	updateNotes = (note) => {
		// console.log(note);
		this.setState({
			title: note.data.title,
			content: note.data.content,
			date: note.data.date,
			textButton: "UPDATE",
			noteId: note.id,
		});
	};

	deleteNote = (e, note) => {
		e.stopPropagation();
		const { deleteNote } = this.props;
		const userData = JSON.parse(localStorage.getItem("UserData"));

		const data = {
			userId: userData._Id,
			noteId: note.id,
		};
		// console.log(data);
		deleteNote(data);
	};

	render() {
		const { title, content, textButton } = this.state;
		const { _notes } = this.props;
		const { updateNotes, deleteNote } = this;
		// console.log("notes: ", _notes);
		if (localStorage.getItem("UserData") === null) {
			this.props.navigate("/");
		}
		return (
			<div className='Dashboard'>
				<HeaderUser />

				<div className='input-form'>
					<input
						placeholder='Title'
						className='input-title'
						value={title}
						onChange={(e) => this.inputState(e, "title")}
					/>
					<textarea
						placeholder='Content'
						className='input-content'
						value={content}
						onChange={(e) => this.inputState(e, "content")}
					></textarea>
					<div className='action-wrapper'>
						{textButton === "UPDATE" ? (
							<button
								className='save-btn cancel'
								onClick={() => {
									this.setState({
										textButton: "SIMPAN",
									});
								}}
							>
								Cancel
							</button>
						) : (
							<div />
						)}
						<button
							className='save-btn'
							onClick={this.handleSavesNotes}
						>
							{textButton}
						</button>
					</div>
				</div>
				<hr />
				{_notes.length > 0 ? (
					<Fragment>
						{_notes.map((note) => {
							return (
								<div
									className='card-container'
									key={note.id}
									onClick={() => updateNotes(note)}
								>
									<p className='title'>{note.data.title}</p>
									<p className='date'>{note.data.date}</p>
									<p className='content'>
										{note.data.content}
									</p>
									<div
										className='delete-btn'
										onClick={(e) => deleteNote(e, note)}
									>
										x
									</div>
								</div>
							);
						})}
					</Fragment>
				) : null}
			</div>
		);
	}
}

const reduxState = (state) => ({
	userData: state.user,
	_notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
	saveNotes: (data) => dispatch(addDataToFirebase(data)),
	getNotes: (userId) => dispatch(getDataFromFirebase(userId)),
	updateNotesAPI: (data) => dispatch(updateDataFromFirebase(data)),
	deleteNote: (data) => dispatch(deleteDataFromFirebase(data)),
});

const DashboardPage = (props) => {
	let navigate = useNavigate();
	return <Dashboard {...props} navigate={navigate} />;
};

export default connect(reduxState, reduxDispatch)(DashboardPage);
