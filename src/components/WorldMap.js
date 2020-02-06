import React, { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";

const URL = "https://lambda-cs25-mud.herokuapp.com/api/room/";

export default function() {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		axios.get(URL, {
			"Authorization": `Token: ${localStorage.getItem("token")}`
		})
		.then(res => {
			console.log("res from GET:", res);
			setRooms(res.data);
		})
		.catch(err => console.log(err))
	}, []);
	
	const structure = rooms.map(room => [
		[
			room.id,
			room.n_to,
		],
		[
			room.id,
			room.s_to
		],
		[
			room.id,
			room.e_to
		],
		[
			room.id,
			room.w_to
		]
	]);

	let i = 0;
	const len = structure.length;
	const links = [];
	for(i; i < len; i += 1) {
		// north
		if (structure[i][0][1] > 0) {
			links.push({source: structure[i][0][0], target: structure[i][0][1]});
		}
		// south
		if (structure[i][1][1] > 0) {
			links.push({source: structure[i][1][0], target: structure[i][1][1]});
		}
		// east
		if (structure[i][2][1] > 0) {
			links.push({source: structure[i][2][0], target: structure[i][2][1]});
		}
		// west
		if (structure[i][3][1] > 0) {
			links.push({source: structure[i][3][0], target: structure[i][3][1]});
		}
	}

	const graphData = {
		nodes: rooms.map(room => {
			return { 
				id: room.id,
				name: room.id				 
			};
		}),
		links
	};

	const config = {
		nodeHighLightBehavior: true,
		node: {
			color: "lightgreen",
			size: 120,
			highlightStrokeColor: "blue"
		},
		link: {
			highlightColor: "lightblue"
		}
	};
	
	
	
	if (rooms.length === 0) return <div>Loading...</div>;

	// if (rooms.length) return <div>Rooms loaded</div>;
	
	if (rooms.length) {
		return (
			<Graph 
				id="graph-id"
				data={graphData}
				config={config}
			/>
		);
	}
}
