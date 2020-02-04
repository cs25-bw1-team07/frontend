import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ({component: Component, ...rest }) {
	return (
		<Route 
			{...rest}
			render={props => {
				if (localStorage.getItem("token")) {
					return <Component {...props} />;
				}
					return <Redirect 
						to={{
							pathname: "/signin",
							state: {from: props.location}
						}}
					/>;
			}}
		/>
	);
}
