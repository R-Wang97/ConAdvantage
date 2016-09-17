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
				<div className = 'contents'>
					<div className = 'center' id = 'welcomePageName'>
						<h1>Room Condition Form</h1>
						<hr />
					</div>
					<div className = 'row' id = 'welcomeTenantInfo'>
						<div className = 'col-md-4'>
							<h3>Hello (name){this.state.name}</h3>
							<h3>Your Room Number is: (room #){this.state.roomNum}</h3>
							<h3>Your Room Type: (room type){this.state.roomType}</h3>
						</div>
					</div>
					<div className = 'row' id = 'welcomeConfirmInfo'>
						<h5>If this information is correct please proceed to the next page and complete the room conditions form.</h5>
						<h5>If this is not you please contact ~~~~~~~~~~</h5> 
					</div>
					<div className = 'center' id = 'welcomeButton'>
						<button type = 'button' className = 'btn btn-primary btn-lg btn-block'><h3>Continue to Form >></h3></button>
					</div>
				</div>
			</div>
		);
		return (welcomeScreenContent);
	}
}

export default Welcome
