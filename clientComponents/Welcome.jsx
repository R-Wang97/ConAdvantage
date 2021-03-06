import React from 'react';

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.roomData.tenant,
			roomNum: props.roomData.number,
			roomType: props.roomData.floorplan_name
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.roomData.tenant,
			roomNum: nextProps.roomData.number,
			roomType: nextProps.roomData.floorplan_name
		});
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row' id='welcomePageText'>
					<h1>Room Condition Form</h1>
					<hr />
				</div>
				<div className='row' id='welcomeTenantInfo'>
					<h3>Hello, {this.state.name}</h3>
					<h3>Your Room Number is: {this.state.roomNum}</h3>
					<h3>Your Room Type: {this.state.roomType}</h3>
				</div>
				<div className='row' id='welcomeConfirmInfo'>
					<h5>If this information is correct, please proceed to the next page.</h5>
					<h5>If this is not you, please contact building administration.</h5> 
				</div>
				<div className='row' id='welcomeButton'>
					<button type='button' className='btn btn-primary btn-lg btn-block' onClick={this.props.changeAppState}>Continue to Form</button>
				</div>
			</div>
		);
	}
}

export default Welcome
