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
				window.alert("Sucessfully submitted");
			},
			error: (status) => {
				console.error(status.status, 'Couldn\'t get room info for id ' + roomId);
			}
		});
	}

	//Only implement if time permitting
	onCreateCustom = () => {
		
	}

	render() {
		return (
			<div className='row' id='submitButton'>
				<button type='button' className='btn btn-primary btn-md btn-block'>Submit</button>
			</div>
		);
	}
}

export default ControlPanel