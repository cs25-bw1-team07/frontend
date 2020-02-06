import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://lambda-cs25-mud.herokuapp.com/api/room/";

export default function() {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		axios.get(URL, {
			"Authorization": `Token: ${localStorage.getItem("token")}`
		})
		.then(res => {
			setRooms(res.data);
		})
		.catch(err => console.log(err))
	}, []);

	if (rooms.length === 0) return <div>Loading...</div>;

	if (rooms.length) {
		return (
			<>
				The rooms have loaded
			</>
		);
	}
}
