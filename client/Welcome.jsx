import React from 'react';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			roomNum: '',
			roomType: '',
		}
	}

	render() {
		const welcomeScreenContent = (
			<div className = 'container'>
				<div className = 'row' id = 'pageName'>
					<h1>Room Conditions Form</h1>
				</div>
				<div className = 'row' id = 'tenantInfo'>
					<h4>Hello {this.state.name}</h4>
					<h4>Your Room Number is: {this.state.roomNum}</h4>
					<h4>Your Room Type: {this.state.roomType}</h4>
				</div>
				<div className = 'row' id = 'confirmInfo'>
					<h4>If this information is correct please proceed to the next page and complete the room conditions form.</h4>
					<h4>If this is not you please contact ~~~~~~~~~~</h4> 
				</div>
				<div className = 'row'>
					<button type = 'button' className = 'btn btn-primary btn-lg btn-block'>Continue to Form >></button>
				</div>
			</div>
		);
		return (welcomeScreenContent);
	}
}

export default Welcome
