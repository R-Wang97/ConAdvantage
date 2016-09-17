import React from 'react';

class ControlPanel extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit = () => {
		//Endpoint is '/api/{id}/submit'
		$.ajax({
			url: '/api' + id + '/submit',
			cache: false,
			success: (data) => {

			},
			error: (status) => {
				console.error(status.status, 'Couldn't get room info for id ' + roomId)
			}
		});
	}

	onCreateCustom = () => {
		
	}

	render() {
		return (
			<div/>
		);
	}
}

export default ControlPanel