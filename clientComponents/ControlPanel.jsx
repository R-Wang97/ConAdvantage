import React from 'react';

class ControlPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.roomId
		}
	}

	onSubmit = () => {
		$.ajax({
			url: '/api' + this.state.id + '/submit',
			cache: false,
			type: 'POST',
			success: (data) => {
				window.alert("Sucessfully submitted");
				window.location.reload();
			},
			error: (status) => {
				console.error(status.status, 'Couldn\'t get room info for id ' + this.state.id);
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